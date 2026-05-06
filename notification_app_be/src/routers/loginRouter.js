import express from "express"
import { addUser, deleteUser } from "../controller/loginController.js"

const loginRouter = express()

loginRouter.post("/login", addUser)
loginRouter.post("/login/:id", deleteUser)


export default loginRouter