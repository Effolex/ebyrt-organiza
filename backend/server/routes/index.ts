import { PrismaClient } from "@prisma/client";
import { Router, RequestHandler } from "express";
import { userRoute } from "./user.routes";
import { taskRouter } from "./task.routes";
import { tagRouter } from "./tag.routes";

const router = Router();

router.use('/user', userRoute);
router.use('/task', taskRouter);
router.use('/tag', tagRouter);

export { router as route };