import { Router } from "express";
import userRouters from "./users.routes";
import movieRouters from "./movies.routes";

const routers = Router();
routers.use(userRouters)
routers.use(movieRouters)
export default routers;