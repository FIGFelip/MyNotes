import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../../src/app.js";

describe("POST /notes", () => {
  it("Deve criar nota corretamente", async () => {
    //criando usuario
    const email = `test${crypto.randomUUID()}@test.com`;
    const userRegisterResponse = await request(app)
      .post("/auth/register")
      .send({
        email: email,
        password: "testpass123",
      });

    if (userRegisterResponse.status !== 201) {
      console.log("Erro no register: ", userRegisterResponse.body);
    }

    //logando usuario
    const loginResponse = await request(app).post("/auth/login").send({
      email: email,
      password: "testpass123",
    });

    const token = loginResponse.body.token;

    if (loginResponse.status !== 200) {
      console.log("Erro no login: ", loginResponse.body);
    }

    //criando a note
    const noteResponse = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "testNote_title",
        body: "testNote_body",
      });

    expect(noteResponse.status).toBe(201);
  });
});

describe("Error POST/notes", () => {
  it("Deve retornar erro se faltar campos obrigatórios", async () => {
    //missing title
    //registrando usuario
    const email = `test${crypto.randomUUID()}@test.com`;
    const userRegisterResponse = await request(app)
      .post("/auth/register")
      .send({
        email: email,
        password: "testpass123",
      });

    if (userRegisterResponse.status !== 201) {
      console.log("Erro no register: ", userRegisterResponse.body);
    }

    //logando usuario
    const loginResponse = await request(app).post("/auth/login").send({
      email: email,
      password: "testpass123",
    });

    const token = loginResponse.body.token;

    if (loginResponse.status !== 200) {
      console.log("Erro no login: ", loginResponse.body);
    }

    //criando a note
    const noteResponse = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "     ",
        body: "testNote_body",
      });

    expect(noteResponse.status).toBe(500);
    expect(noteResponse.body.message).toBe(
      "É necessário título e corpo do texto",
    );

    //missing body
    //criando a note
    const noteResponse2 = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "testTitle",
        body: "    ",
      });

    expect(noteResponse2.status).toBe(500);
    expect(noteResponse2.body.message).toBe(
      "É necessário título e corpo do texto",
    );
  });

  //token error tests
  it("Deve retornar erro em caso de token inválido/ausente/corrompido", async () => {
    //missing token
    //registrando usuario
    const email = `test${crypto.randomUUID()}@test.com`;
    const userRegisterResponse = await request(app)
      .post("/auth/register")
      .send({
        email: email,
        password: "testpass123",
      });

    if (userRegisterResponse.status !== 201) {
      console.log("Erro no register: ", userRegisterResponse.body);
    }

    //logando usuario
    const loginResponse = await request(app).post("/auth/login").send({
      email: email,
      password: "testpass123",
    });

    //const token = loginResponse.body.token

    if (loginResponse.status !== 200) {
      console.log("Erro no login: ", loginResponse.body);
    }

    //criando a note
    const noteResponse = await request(app).post("/notes").send({
      title: "testTitle",
      body: "testNote_body",
    });

    expect(noteResponse.status).toBe(401);
    expect(noteResponse.body.message).toBe("No token provided");

    //corrupted token
    //criando a note
    const noteResponse2 = await request(app)
      .post("/notes")
      .set("authorization", "Bearer")
      .send({
        title: "testTitle",
        body: "testNote_body",
      });

    expect(noteResponse2.status).toBe(401);
    expect(noteResponse2.body.message).toBe("Corrupted token");

    //token invalido
    //criando a note
    const noteResponse3 = await request(app)
      .post("/notes")
      .set("authorization", "Bearer token invalido")
      .send({
        title: "testTitle",
        body: "testNote_body",
      });

    expect(noteResponse3.status).toBe(401);
    expect(noteResponse3.body.message).toBe("Token inválido");
  });
});
