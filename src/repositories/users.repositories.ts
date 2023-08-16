import prisma from "@/database/database.connections";
import { User, Session } from "@prisma/client";

type CreateUser = Omit<User,"id">
type CreateSession = Omit<Session,"id">

function createUserDB(body:CreateUser) {
	return prisma.user.create({
		data: body
	})
}

function createSessionDB(body:CreateSession) {
	return prisma.session.create({data:body})
}
function getUserByEmailDB(email:string) {
	return prisma.user.findMany({where:{email}})
}
function deleteExpiredSessionDB(id:number, token:string) {
	return prisma.session.deleteMany({
		where:{
			AND:[
				{user_id: id},
				{token: token}
			]
		}
	})
}
function userLoggedDB(id:number, token:string) {
	return prisma.session.findMany({
		where:{
			AND:[
				{user_id: id},
				{token: token}
			]
		}
	})
}


const userRepositories = {
    createUserDB,
    createSessionDB,
    getUserByEmailDB,
    deleteExpiredSessionDB,
    userLoggedDB,
}
export default userRepositories;