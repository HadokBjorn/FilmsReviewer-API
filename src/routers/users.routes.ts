import userControllers from "@/controllers/users.controllers";
import userMiddleware from "@/middlewares/users.middlewares";
import validateSchema from "@/middlewares/validateSchema.middlewares";
import { loginSchema, signupSchema } from "@/schemas/users.schemas";
import { Router } from "express";

const userRouters = Router();

userRouters.post("/signup",validateSchema(signupSchema), userControllers.signup)
userRouters.post("/login",validateSchema(loginSchema),userMiddleware.validateLogin, userControllers.login)

export default userRouters;