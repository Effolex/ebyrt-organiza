
import { Router, RequestHandler } from 'express';
import authenticate from '../middlewares/authenticate';
import TaskController from '../controllers/task';
import validation from '../middlewares/validation';

const router = Router();
const controller = new TaskController();

router.post('/create',authenticate, validation.taskReq, controller.create);
router.patch('/:id/edit', authenticate, controller.edit);
router.get('/get',authenticate, controller.getAll);
router.delete('/:id/delete', authenticate, controller.delete);

export { router as taskRouter };