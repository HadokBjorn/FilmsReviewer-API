import { Session, User } from "@/types/users.types"
import { db } from "@/database/database.connections";

function createUserDB(body:User) {
	const { username, email, hash } = body;
	return db.query(`INSERT INTO users (username, email, password) VALUES ($1,$2,$3)`, [
		username,
		email,
		hash,
	]);
}

function createSessionDB(body:Session) {
	const { id, token } = body;
	return db.query(`INSERT INTO sessions (user_id, token) VALUES ($1,$2)`, [id, token]);
}
function getUserByEmailDB(email:string) {
	return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}
function deleteExpiredSessionDB(id:number, token:string) {
	return db.query(`DELETE FROM sessions WHERE user_id=$1 AND token !=$2 ;`, [Number(id), token]);
}
function userLoggedDB(id:number, token:string) {
	return db.query(`SELECT * FROM sessions WHERE user_id=$1 AND token=$2`, [id, token]);
}
/* function updatePostDB(body) {
	const { description, id, userId } = body;
	return db.query(
		`
		UPDATE posts SET description=$1
		WHERE id=$2 AND user_id=$3;
	`,
		[description, Number(id), Number(userId)]
	);
} */
function deleteMovieDB(id:number, userId:number) {
	return db.query(`DELETE FROM posts WHERE id=$1 AND user_id=$2;`, [id, userId]);
}

const userRepositories = {
    createUserDB,
    createSessionDB,
    getUserByEmailDB,
    deleteExpiredSessionDB,
    userLoggedDB,
    deleteMovieDB,
}
export default userRepositories;