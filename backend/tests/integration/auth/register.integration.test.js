import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../../src/app.js";

//happy path-----
describe("POST /auth/register", () => {
  it("deve registrar usuário", async () => {
    const email = `test${crypto.randomUUID()}@test.com`
    const registerResponse = await request(app).post("/auth/register").send({
      email: email,
      password: "testpassintegration",
    });

    expect(registerResponse.status).toBe(201);

    expect(registerResponse.body).toHaveProperty("id");
  });
});

//sad path-----
describe("Error POST /auth/register", () => {
  // email faltando
  it("Deve retornar erro se não houver email", async () => {
    const registerRes = await request(app).post("/auth/register").send({
      email: "   ",
      password: "testPass",
    });

    expect(registerRes.status).toBe(400);
    expect(registerRes.body.message).toBe("Campos de email/password faltantes");
  });

  // password faltando
  it("Deve retornar erro se não houver password", async () => {
    const email = `test${crypto.randomUUID()}@test.com`;
    const registerRes = await request(app).post("/auth/register").send({
      email: email,
      password: "    ",
    });

    expect(registerRes.status).toBe(400);
    expect(registerRes.body.message).toBe("Campos de email/password faltantes");
  });

  //email em uso
  it("Deve retornar erro se email já estiver em uso", async () => {
    //1 email
    const email = `test${crypto.randomUUID()}@test.com`
    const registerRes = await request(app).post("/auth/register").send({
      email: email,
      password: "testPass",
    });

    
    // repetindo email
    const registerRes2 = await request(app).post("/auth/register").send({
      email: email,
      password: "test123",
    });
    
    
    expect(registerRes.status).toBe(201);
    expect(registerRes2.status).toBe(400);
    expect(registerRes2.body.message).toBe("Credenciais inválidas");
  });
});
