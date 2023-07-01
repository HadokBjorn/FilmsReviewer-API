import { User } from "@/types/users.types";
import joi from "joi"

export const signupSchema = joi.object<User>({
	username: joi.string().min(3).required(),
	image: joi.string().uri().required(),
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
		.required(),
	password: joi.string().min(6).required(),
});

export const loginSchema = joi.object<User>({
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
		.required(),
	password: joi.string().min(6).required(),
});