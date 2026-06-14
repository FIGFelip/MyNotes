import dotenv from "dotenv"
import path from "node:path"


process.env.NODE_ENV = "test"

dotenv.config({
    path: path.resolve(process.cwd(), "../.env.test")
})
process.env.DATABASE_URL =
`postgresql://${process.env.POSTGRES_USER}:` +
`${process.env.POSTGRES_PASSWORD}@` +
`${process.env.POSTGRES_HOST}:` +
`${process.env.POSTGRES_PORT}/` +
`${process.env.POSTGRES_DB}`
