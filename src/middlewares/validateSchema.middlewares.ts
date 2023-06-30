import errorCase from "@/errors/errors";
import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

function validateSchema(schema:Schema) {
	return (req:Request, res:Response, next:NextFunction) => {
		const validation = schema.validate(req.body, { abortEarly: false });

		if (validation.error) {
			const errors = validation.error.details.map((detail) => detail.message);
			throw errorCase.UnprocessableEntityError(errors);
		}

		next();
	};
}
export default validateSchema;