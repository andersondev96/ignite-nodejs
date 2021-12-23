import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { Connection, createConnection } from "typeorm";
import { hash } from "bcryptjs";

import { app } from "../../app";

let connection: Connection;

describe("CreateStatement Controller", () => {
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

  it("should be able to create a new deposit statement", async () => {
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "test@email.com",
      password: "1234",
    });

    const { token } = responseToken.body;

    const statement = {
      amount: 100.0,
      description: "test",
    };

    const response = await request(app)
      .post("api/v1/statements/deposit")
      .send(statement)
      .set({ authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
  });

  it("should be able to create a new withdraw statement", async () => {
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "test@email.com",
      password: "1234",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("api/v1/statements/deposit")
      .send({
        amount: 234.0,
        description: "test",
      })
      .set({ authorization: `Bearer ${token}` });

    const statement = {
      amount: 100.0,
      description: "test withdraw",
    };

    const response = await request(app)
      .post("/api/v1/statements/withdraw")
      .send(statement)
      .set({ authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
  });
});
