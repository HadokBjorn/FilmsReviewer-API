import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

type ConfigDatabase = {
    connectionString: string | undefined;
    ssl: boolean
}

const { Pool } = pg;

const configDatabase: ConfigDatabase = {
	connectionString: process.env.DATABASE_URL,
    ssl: false
};
if (process.env.MODE === "prod") configDatabase.ssl = true;

export const db = new Pool(configDatabase);