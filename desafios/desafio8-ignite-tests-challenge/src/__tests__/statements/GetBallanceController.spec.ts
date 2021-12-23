import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { Connection, createConnection } from "typeorm";
import { app } from "../../app";
import { hash } from "bcryptjs";

let connection: Connection;

describe("Get Ballance", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("1234", 8);

    await connection.query(`
      INSERT INTO users(id, name, email, password)
      VALUES ('${id}', 'test', 'test@email.com', '${password}')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to get balance", async () => {
    const responseToken = await request(app)
    .post("/api/v1/sessions")
    .send({
      email: "test@email.com",
      password: "1234",
    })

    const { token } = responseToken.body;

   await request(app)
    .post("/api/v1/statements/deposit")
    .send({
      amount: 123.4,
      description: "test",
    })
    .set({ authorization: `Bearer ${token}` });

  const response = await request(app)
    .get("/api/v1/statements/balance")
    .set({ authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("balance");
    expect(response.body.balance).toBe(123.4);
  });
});
