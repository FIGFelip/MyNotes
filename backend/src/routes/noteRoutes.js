import { Router } from "express"
import { sanitizeNote } from "../middlewares/note/sanitizeMiddleware.js"
import { validateNote } from "../middlewares/note/validationMiddleware.js"
import {getNotes, getNoteById, createNotes, moveToTrash, deleteFromTrash, editNote, getNotesFromTrash, recoverFromTrash} from "../controllers/noteControllers.js"

const router = Router()

router.get("/", getNotes)
router.get("/trash", getNotesFromTrash)
router.patch("/trash/:id/recover", recoverFromTrash)
router.delete("/trash/:id", deleteFromTrash)
router.get("/:id", getNoteById)
router.put("/:id", sanitizeNote, validateNote, editNote)
router.patch("/:id", moveToTrash)
router.post("/", sanitizeNote, validateNote, createNotes)


export default router