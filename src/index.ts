import express, { json } from "express";
import "express-async-errors"
import dotenv from "dotenv";
import cors from "cors";
import routers from "@/routers/index.routes";
import httpStatus from "http-status"
import errorHandler from "./middlewares/errors.middleware";

const app = express();
dotenv.config();
app.use(json());
app.use(cors());
app.use(routers);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.get("/health", (req, res) => res.sendStatus(httpStatus.OK));

app.listen(PORT, () => console.log(`Server online in port: ${PORT}`));
