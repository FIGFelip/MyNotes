import app from "../../../src/app.js";
import request from "supertest";
import { it, expect, describe } from "vitest";

describe("GET/id notes", () => {
  it("Deve retornar nota específica", async () => {
    //register
    const email = `test${crypto.randomUUID()}@test.com`;
    const createUserRes = await request(app).post("/auth/register").send({
      email: email,
      password: "testPass",
    });

    if (createUserRes.status !== 201) {
      console.log("Erro no register: ", createUserRes.body);
    }

    //login
    const loginRes = await request(app).post("/auth/login").send({
      email: email,
      password: "testPass",
    });

    const token = loginRes.body.token;

    if (loginRes.status !== 200) {
      console.log("Erro no login: ", loginRes.body);
    }

    //create note
    const createNoteRes = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "testTitle",
        body: "testBody",
      });

    //noteId
    const noteId = createNoteRes.body.id;

    if (createNoteRes.status !== 201) {
      console.log("Erro ao criar nota: ", createNoteRes.body);
    }

    const uniqueNoteRes = await request(app).get(`/notes/${noteId}`).set("Authorization", `Bearer ${token}`)

    if(uniqueNoteRes.status!==200){
        console.error("Erro no getUnique: ",uniqueNoteRes.body)
    }

    expect(uniqueNoteRes.status).toBe(200)
  });
});
