
import { Router, RequestHandler } from 'express';
import validation from '../middlewares/validation';
import UserController from '../controllers/user';
import authenticate from '../middlewares/authenticate';

const router = Router();
const controller = new UserController();

router.post('/create', validation.userReq, controller.create);
router.get('/get',authenticate, controller.getAll);
router.post('/login',validation.userReq, controller.login);
router.patch('/edit',authenticate, controller.editName);

export { router as userRoute };