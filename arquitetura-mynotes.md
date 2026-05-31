# Arquitetura do Backend — MyNotes

Fluxo de uma requisição:
```
CLIENT → ROUTE → CONTROLLER → SERVICE → REPOSITORY → DATABASE
```

---

## 1. ROUTE `src/routes/`

**Responsabilidade:** Definir o endpoint e o método HTTP. Só redireciona para o controller — sem lógica nenhuma.

```js
// src/routes/authRoutes.js
import { Router } from 'express'
import { register, login } from '../controllers/authController.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)

export default router
```

---

## 2. CONTROLLER `src/controllers/`

**Responsabilidade:** Receber `req`/`res`, extrair dados do body, chamar o service e devolver a resposta HTTP. Não contém lógica de negócio.

```js
// src/controllers/authController.js
import * as authService from '../services/authService.js'

export async function register(req, res) {
  const { email, senha } = req.body
  const user = await authService.register(email, senha)
  res.status(201).json(user)
}

export async function login(req, res) {
  const { email, senha } = req.body
  const token = await authService.login(email, senha)
  res.status(200).json({ token })
}
```

---

## 3. SERVICE `src/services/`

**Responsabilidade:** Toda a lógica de negócio. Validações, regras, hash de senha, geração de JWT. Chama o repository para persistir ou buscar dados.

```js
// src/services/authService.js
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as userRepository from '../repositories/userRepository.js'

export async function register(email, senha) {
  const existe = await userRepository.findByEmail(email)
  if (existe) throw new Error('Email já cadastrado')

  const hash = await bcrypt.hash(senha, 10)
  return userRepository.create(email, hash)
}

export async function login(email, senha) {
  const user = await userRepository.findByEmail(email)
  if (!user) throw new Error('Usuário não encontrado')

  const senhaValida = await bcrypt.compare(senha, user.senha)
  if (!senhaValida) throw new Error('Senha incorreta')

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
```

---

## 4. REPOSITORY `src/repositories/`

**Responsabilidade:** Só executar queries no banco. Sem lógica, sem validação. Se trocar o banco de dados no futuro, só muda aqui.

```js
// src/repositories/userRepository.js
import db from '../config/db.js'

export async function findByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
  return rows[0]
}

export async function create(email, senha) {
  const [result] = await db.query(
    'INSERT INTO users (email, senha) VALUES (?, ?)',
    [email, senha]
  )
  return { id: result.insertId, email }
}
```

---

## 5. CONFIG `src/config/`

**Responsabilidade:** Configuração e conexão com o banco. Exporta o pool para ser usado pelos repositories.

```js
// src/config/db.js
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

export default pool
```

---

## Resumo de responsabilidades

| Camada       | O que faz                          | O que NÃO faz                        |
|--------------|------------------------------------|--------------------------------------|
| Route        | Define endpoint e método HTTP      | Lógica, validação                    |
| Controller   | Recebe req/res, chama service      | Lógica de negócio, query no banco    |
| Service      | Regras, validações, lógica         | Query direta no banco                |
| Repository   | Queries SQL                        | Lógica, validação                    |
| Config       | Conexão com o banco                | Nada além disso                      |

---

## Estrutura de pastas

```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   ├── repositories/
│   │   ├── userRepository.js
│   │   └── noteRepository.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   └── noteService.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
└── package.json
```
