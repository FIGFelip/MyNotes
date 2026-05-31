import * as service from "../services/authService.js"



// register
export async function register(req, res){
    //calling register function from services
    try{
        const {email, senha} = req.body
        const user = await service.UserRegister(email, senha)
        if (!user){
            return res.status(400).json({"message":"Erro ao criar usuário"})
        }
        res.sendStatus(201).json(user)
    } catch(err){
        return res.status(400).message(err)
    }   
}



// login
export async function login(req,res){
    //calling login function from services
    try{
        const {email, senha} = req.body
        const token = await service.login(email, senha)
        res.status(200).json({token})
    } catch(err) {
        return res.status(400).message(err)
    }
}