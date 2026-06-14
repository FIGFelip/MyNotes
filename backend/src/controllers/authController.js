import * as service from "../services/authService.js"



// register
export async function register(req, res){
    //calling register function from services
    try{
        const {email, senha} = req.body
        if(!email || !senha || email.trim()==="" || senha.trim()==="") {
            throw new Error("Campos de email/senha faltantes")
        }
        const user = await service.register(email, senha)
        if (!user){
            return res.status(400).json({"message":"Erro ao criar usuário"})
        }
        return res.status(201).json(user)
    } catch(err){
        return res.status(400).json({
            message:err.message
        })
    }   
}



// login
export async function login(req,res){
    //calling login function from services
    try{
        const {email, senha} = req.body
        if(!email || !senha || email.trim()==="" || senha.trim()==="") {
            throw new Error("Campos de email/senha faltantes")
        }
        const token = await service.login(email, senha)
        if (!token){
            throw new Error("Token não fornecido")
        }
        return res.status(200).json(token)
    } catch(err) {
        return res.status(400).json({
            message: err.message
        })
    }
}