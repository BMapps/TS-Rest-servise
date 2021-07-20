Basic Rest API with typescript

available routes:

/users
    GET /users - get all users
    GET /users/:userId - get the user by id 
    POST /users - create user
    PUT /users/:userId - update user
    DELETE /users/:userId - delete user
/boards
    GET /boards - get all boards
    GET /boards/:boardId - get the board by id
    POST /boards - create board
    PUT /boards/:boardId - update board
    DELETE /boards/:boardId - delete board
boards/:boardId/tasks
    GET boards/:boardId/tasks - get all tasks
    GET boards/:boardId/tasks/:taskId - get the task by id
    POST boards/:boardId/tasks - create task
    PUT boards/:boardId/tasks/:taskId - update task
    DELETE boards/:boardId/tasks/:taskId - delete task
/login - authorization route
    POST /login  - pass body with "login' and "password" fields to get authorization token

use Authorization header with Bearer scheme to get access to all routes
use application/json header to correct API work
for default access please use login: "user" with password: "user"
