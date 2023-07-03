import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userRepositories from "@/repositories/users.repositories";
import { Request, Response, NextFunction } from "express";
import errorCase from "@/errors/errors";
dotenv.config();


export async function authorization(req:Request, res:Response, next:NextFunction ) {
	const { authorization } = req.headers;
    try{
        const token = authorization?.replace("Bearer ", "");

        if (!token) throw errorCase.unauthorizedError("Token não encontrado!");

        const userInfo = jwt.verify(token, process.env.SECRET_KEY);

        //console.log(userInfo)

        let id:string;

        if (typeof userInfo === "string") throw errorCase.unauthorizedError("Token Inválido ou Expirado.");
        
        id = userInfo.id;

        const user = await userRepositories.userLoggedDB(Number(id), token);

        if (user.rowCount === 0) throw errorCase.unauthorizedError("Token expirado ou inválido.");
        
        res.locals.user = userInfo;
        next();
    }catch(err){
        throw errorCase.unauthorizedError("Token expirado ou inválido.")
    }
}