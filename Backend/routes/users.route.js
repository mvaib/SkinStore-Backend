import express from 'express'
import { loginUser, registerUser } from '../controllers/users.controller.js'

const userRouter = express.Router()

//post request
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

export default userRouter
