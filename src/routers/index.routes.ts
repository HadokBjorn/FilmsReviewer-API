import { Router } from "express";
import userRouters from "./users.routes";

const routers = Router();
routers.use(userRouters)

export default routers;