import * as service from "../services/noteService.js"

export async function getNotes(req, res){
    const user = req.userId
    try{
        const notes = await service.get(user)
        if(!notes){
            return res.json({message:"No notes found"})
        }
        return res.status(200).json(notes)
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

export async function getNotesFromTrash(req, res){
    const userId = req.userId
    try{
        const TrashNotes = await service.getFromTrash(userId)
        if(!TrashNotes || TrashNotes.length===0){
            return res.json({message: "Não há notas na lixeira"})
        }
        return res.status(200).json(TrashNotes)
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

export async function createNotes(req, res){
    const userId = req.userId
    const{title, body} = req.body

    try{
        const newNote = await service.create(userId, title, body)
        if (!newNote){
            return res.json({message:"Não foi possível criar uma nova nota"})
        }
        return res.status(201).json(newNote)
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

export async function editNote(req, res){
    const {id} = req.params
    const userId = req.userId
    const {title, body} = req.body
    try{
        const editedNote = await service.edit(id, userId, title, body)
        if (editedNote.count===0){
            return res.status(404).json({message:"Nota não encontrada"})
        }
        return res.status(200).json({message:"Nota editada"})
    } catch(err){
        return res.status(500).json({"Erro ao editar a nota":err.message})
    }
}

export async function moveToTrash(req, res){
    const {id}=req.params
    const userId = req.userId
    try{
        const deletedNote = await service.softDelete(id, userId)
        if(deletedNote.count===0){
            return res.json({message:"Não foi possível mover a nota para a lixeira"})
        }
        return res.status(204).json({message:"Nota enviada à lixeira"})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

export async function recoverFromTrash(req, res){
    const {id} = req.params
    const userId = req.userId
    try{
        const recoveredNote = await service.recover(id, userId)
        if(recoveredNote.count===0){
            return res.json({message:"Não foi possível restaurar a nota"})
        }
            return res.status(200).json({message:"Nota recuperada com sucesso"})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

export async function deleteFromTrash(req, res){
    const {id}= req.params
    const userId = req.userId
    try{
        const hardDeletedNote = await service.hardDelete(id, userId)
        
        if(!hardDeletedNote || hardDeletedNote.count==0){
            return res.status(404).json({message:"Não foi possível deletar a nota"})
        }

        return res.status(204).json({message:"Nota deletada com sucesso"})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}