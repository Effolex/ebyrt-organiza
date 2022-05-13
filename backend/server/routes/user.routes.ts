
import { Router, RequestHandler } from 'express';
import { validateUser } from '../middlewares/validateUser';
import UserController from '../controllers/user';

const router = Router();
const controller = new UserController();

router.post('/create', validateUser, controller.create);
router.get('/get', controller.getAll);
router.post('/login',validateUser, controller.login);
router.patch('/edit', controller.editName);

export { router as userRoute };