import { Connection, createConnection } from "typeorm";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import { app } from "../../app";

const id_user = uuidV4();
const id_user_2 = uuidV4();
const statementId = uuidV4();

let connection: Connection;

describe("Transfer Between Account Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("1234", 8);

    await connection.query(`
      INSERT INTO users(id, name, email, password)
      VALUES ('${id_user}', 'User 1', 'user1@test.com', '${password}')
    `);

    await connection.query(`
      INSERT INTO users(id, name, email, password)
      VALUES ('${id_user_2}', 'User 2', 'user2@test.com', '${password}')
    `);

    await connection.query(`
      INSERT INTO statements(id, user_id, description, amount, type)
      VALUES('${statementId}, '${id_user}, 'deposit', 500, 'deposit)
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to transfer an amount to an user", async () => {
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "test@email.com",
      password: "1234",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post(`/api/v1/statements/transfers/${id_user_2}`)
      .send({
        description: "transfer",
        amount: 100,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });


    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });
});
