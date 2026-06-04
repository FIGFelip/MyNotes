import { describe, it, expect, vi, beforeEach } from "vitest";
import * as noteRepo from "../../../src/repositories/noteRepository.js";
import { create } from "../../../src/services/noteService.js";

vi.mock("../../../src/repositories/noteRepository.js", () => ({
  createNewNote: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

// criando notes
describe("create note", () => {
  it("deve criar uma note corretamente", async () => {
    noteRepo.createNewNote.mockResolvedValue({
      userId: 1,
      title: "Teste",
      body: "Body",
    });

    const result = await create(1, "Test", "Body");

    expect(result).toEqual({
      userId: 1,
      title: "Teste",
      body: "Body",
    });

    expect(noteRepo.createNewNote).toHaveBeenCalledWith(1, "Test", "Body");
  });

  it("Deve retornar erro caso não exista userID", async () => {
    await expect(create(null, "Test", "Body")).rejects.toThrow(
      "Usuário não identificado",
    );

    expect(noteRepo.createNewNote).not.toHaveBeenCalled();
  });

  it("Deve retornar erro caso não exista título", async () => {
    await expect(create(1, null, "Body")).rejects.toThrow(
      "É necessário título e corpo do texto",
    );

    expect(noteRepo.createNewNote).not.toHaveBeenCalled();
  });

  it("Deve retornar erro caso não exista corpo da note", async () => {
    await expect(create(1, "Test", null)).rejects.toThrow(
      "É necessário título e corpo do texto",
    );

    expect(noteRepo.createNewNote).not.toHaveBeenCalled();
  });

  it("Deve retornar erro se título for maior do que 100 caracteres", async () => {
    const title = "a".repeat(101);

    await expect(create(1, title, "Body")).rejects.toThrow(
      "Título muito longo. limite: 100 caracteres",
    );

    expect(noteRepo.createNewNote).not.toHaveBeenCalled();
  });
});
