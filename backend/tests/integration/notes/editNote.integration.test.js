import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../../src/app.js";

describe("PUT /notes", () => {
  it("Deve editar uma nota corretamente", async () => {
    //criando usuario
    const email = `test${crypto.randomUUID()}@test.com`;
    const registerRes = await request(app).post("/auth/register").send({
      email: email,
      senha: "testpass",
    });

    if (registerRes.status !== 201) {
      console.log("Erro no REGISTER: ", registerRes.body);
    }

    //logando
    const loginRes = await request(app).post("/auth/login").send({
      email: email,
      senha: "testpass",
    });
    //token
    const token = loginRes.body.token;

    if (loginRes.status !== 200) {
      console.log("Erro no LOGIN: ", loginRes.body);
    }

    //criando note
    const createNoteRes = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "testTitle",
        body: "testBody",
      });

    //noteId
    const noteId = createNoteRes.body.id;

    expect(createNoteRes.status).toBe(201);

    // editando note
    const editNoteRes = await request(app)
      .put(`/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "editedTitle",
        body: "editedBody",
      });

    expect(editNoteRes.status).toBe(200);

    //Validando a edição
    const getNotesRes = await request(app)
      .get("/notes")
      .set("Authorization", `Bearer ${token}`);

    const editedNote = getNotesRes.body.find((note) => note.id == noteId);

    expect(editedNote.title).toBe("editedTitle");
    expect(editedNote.body).toBe("editedBody");
  });
});

describe("Error PUT/notes", () => {
  it("Deve retornar erro ao tentar editar note de outro usuário", async () => {
    //=====user1=====
    //register
    const email1 = `test${crypto.randomUUID()}@test.com`;
    const firstUser = await request(app).post("/auth/register").send({
      email: email1,
      senha: "testpass",
    });

    if (firstUser.status !== 201) {
      console.log("Erro no cadastro do firstUser: ", firstUser.body);
    }
    expect(firstUser.status).toBe(201);

    //firstUser login
    const firstUserlogin = await request(app).post("/auth/login").send({
      email: email1,
      senha: "testpass",
    });

    //token
    const token1 = firstUserlogin.body.token;

    if (firstUserlogin.status !== 200) {
      console.log("Erro no LOGIN: ", firstUserlogin.body);
    }

    //user1 note
    const firstUserNote = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token1}`)
      .send({
        title: "user1Title",
        body: "user1Body",
      });

    // console.log("FirstUserNote ANTES edit", firstUserNote.body);

    const firstUserNoteId = firstUserNote.body.id;

    expect(firstUserNote.status).toBe(201);

    //=====user2=====
    //register
    const email2 = `test${crypto.randomUUID()}@test.com`;
    const secondUser = await request(app).post("/auth/register").send({
      email: email2,
      senha: "testpass",
    });

    if (secondUser.status !== 201) {
      console.log("Erro no cadastro do user 2: ", secondUser.body);
    }
    expect(secondUser.status).toBe(201);

    //login
    const secondUserLogin = await request(app).post("/auth/login").send({
      email: email2,
      senha: "testpass",
    });
    if (secondUserLogin.status !== 200) {
      console.log("Erro no login do user2: ", secondUserLogin.body);
    }
    expect(secondUserLogin.status).toBe(200);

    //token2
    const token2 = secondUserLogin.body.token;

    //second user's note
    const secondUserNote = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token2}`)
      .send({
        title: "user2TitleNoChanges",
        body: "user2BodyNoChanges",
      });

    //const secondUserNoteId = secondUserNote.body.id

    if (secondUserNote.status !== 201) {
      console.log("erro criando a nota do user2: ", secondUserNote.body);
    }
    expect(secondUserNote.status).toBe(201);

    //editing
    const user2EditedNote = await request(app)
      .put(`/notes/${firstUserNoteId}`)
      .set("Authorization", `Bearer ${token2}`)
      .send({
        title: "editedTitleBysecondUser",
        body: "editedBodyBySecondUser",
      });

    // console.log("FirstUserNote APÓS edit", firstUserNote.body);
    // console.log("Note do user2 APÓS edit:", secondUserNote.body);

    if (user2EditedNote.status !== 404) {
      console.log("Erro editando nota do user2", user2EditedNote.body);
    }
    expect(user2EditedNote.status).toBe(404);
  });
});
