import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../app";

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

    it("should be able create a new user", async () => {
      const user = {
        name: "New User",
        email: "test@test.com",
        password: "12345"
      }

      const response = await request(app).post("/api/v1/users").send(user);

      expect(response.status).toBe(201);
    })
  });
