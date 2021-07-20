import express from 'express';
import {router as userRouter} from './resources/users/user.router.js';
import {router as boardsRouter} from './resources/boards/board.router.js';
import {router as tasksRouter} from './resources/tasks/task.router.js';
import {logger} from './middleware/logger.js'
import {errorHandler} from './middleware/errorHandler.js'
import {router as loginRouter} from './middleware/loginRouter.js'
import {authentication} from './middleware/authentication.js'

const app = express();

app.use(express.json());

app.use('*', logger);

app.use('*', authentication);

app.use('/users', userRouter);

app.use('/boards', boardsRouter);

app.use('/boards/:boardId/tasks', tasksRouter);

app.use('/login', loginRouter);

app.use('*', errorHandler);

export default app;

