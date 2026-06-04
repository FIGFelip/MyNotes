import { describe, it, expect, vi, beforeEach } from "vitest";
import * as noteRepo from "../../../src/repositories/noteRepository.js";
import { edit} from "../../../src/services/noteService.js";

//mock das funções repositories
vi.mock("../../../src/repositories/noteRepository.js", () => ({
  createNewNote: vi.fn(),
  editNoteById: vi.fn(),
}));

//limpando cada teste
beforeEach(() => {
  vi.clearAllMocks();
});

//teste de edits

describe("Edit note", () => {
  it("deve editar nota corretamente", async () => {
    noteRepo.editNoteById.mockResolvedValue({
      id: 1,
      userId: 1,
      title: "editTest",
      body: "editBody",
    });

    const editResult = await edit(1, 1, "editTest", "editBody");

    expect(editResult).toEqual({
      id: 1,
      userId: 1,
      title: "editTest",
      body: "editBody",
    });
  });

  it("deve retornar erro se não houver Id da Note", async () => {
    await expect(edit(null, 1, "editTest", "editBody")).rejects.toThrow(
      "Nota não encontrada",
    );

    expect(noteRepo.editNoteById).not.toHaveBeenCalled();
  });

  it("Deve retornar erro se não houver userId", async () => {
    await expect(edit(1, null, "editTest", "editBody")).rejects.toThrow(
      "Usuário não identificado",
    );

    expect(noteRepo.editNoteById).not.toHaveBeenCalled();
  });
});
