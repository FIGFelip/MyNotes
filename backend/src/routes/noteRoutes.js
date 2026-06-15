import { Router } from "express"
import { sanitizeNote } from "../middlewares/sanitizeMiddleware.js"
import { validateNote } from "../middlewares/validationMiddleware.js"
import {getNotes, createNotes, moveToTrash, deleteFromTrash, editNote, getNotesFromTrash, recoverFromTrash} from "../controllers/noteControllers.js"

const router = Router()

router.get("/", getNotes)
router.put("/:id", sanitizeNote, validateNote, editNote)
router.post("/", sanitizeNote, validateNote, createNotes)
router.get("/trash", getNotesFromTrash)
router.patch("/:id", moveToTrash)
router.delete("/trash/:id", deleteFromTrash)
router.patch("/trash/:id/recover", recoverFromTrash)


export default router