import { PrismaClient } from "@prisma/client";
import { Router, RequestHandler } from "express";
import { userRoute } from "./user.routes";

const router = Router();

router.use('/user', userRoute);

export { router as route };