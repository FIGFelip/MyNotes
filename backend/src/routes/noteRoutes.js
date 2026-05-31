import { Router } from "express"
import {getNotes, createNotes, moveToTrash, deleteFromTrash, editNote, getNotesFromTrash} from "../controllers/noteControllers.js"

const router = Router()

router.get("/", getNotes)
router.get("/trash", getNotesFromTrash)
router.post("/", createNotes)
router.delete("/:id", moveToTrash)
router.put("/trash/:id", editNote)


export default router