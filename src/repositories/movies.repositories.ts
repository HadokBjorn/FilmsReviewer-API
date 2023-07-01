import { db } from "@/database/database.connections";
import { Movie } from "@/types/users.types";

function createMovieDB(body:Movie) {
    const {
        userId,
		title,
		synopsis,
		date,
		genre,
		poster,
		watched
    } = body;

    let query:string = `INSERT INTO movies (user_id,title,synopsis,date,genre,poster) 
    VALUES ($1,$2,$3,$4,$5,$6)`;

    if(watched !== undefined){
        query = `INSERT INTO movies (
            user_id,
            title,
            synopsis,
            date,
            genre,
            poster,
            watched
            ) VALUES ($1,$2,$3,$4,$5,$6,$7)`

        return db.query(query, [
                userId,
                title,
                synopsis,
                date,
                genre,
                poster,
                watched
            ]);
    }

    return db.query(query, [
        userId,
        title,
        synopsis,
        date,
        genre,
        poster
    ]);
}

function getMoviesDB(){
    return db.query(`SELECT * FROM movies;`);
}

function deleteMovieDB(id:number, userId:number) {
	return db.query(`DELETE FROM movies WHERE id=$1 AND user_id=$2;`, [id, userId]);
}

const moviesRepository = {
    createMovieDB,
    getMoviesDB,
    deleteMovieDB,
}

export default moviesRepository;