
import { Router, RequestHandler } from 'express';
import authenticate from '../middlewares/authenticate';
import tagController from '../controllers/tag';

const router = Router();
const controller = new tagController();

router.get('/get',authenticate, controller.getAll);

export { router as tagRouter };