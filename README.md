# Task Management System

A simple **Task Management** system built with **Node.js**, **Express**, **MongoDB**, and **Socket.io** for real-time notifications. 

## Features
- **User Role Management**: Admins can create, update, and delete tasks for anyone. Regular users can create, update, and delete their own tasks.
- **Task Assignment**: Admins can assign tasks to any user.
- **Real-Time Notifications**: Users are notified in real-time when tasks are assigned or updated via **WebSockets** using **Socket.io**.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose ORM)
- **Socket.io** for real-time communication
- **JWT Authentication**

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/task-management-system.git 
```

### 2. Install dependencies:
Navigate to the project directory and run:
```bash
cd task-management-system
npm install
```
### 3. Set up environment variables:
Create a .env file in the root of the project and add the following variables:
```bash
env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=5000
Replace your-mongodb-connection-string and your-secret-key with your actual MongoDB connection string and a secret key for JWT authentication.
```

### 4. Run the server:
After setting up the environment variables, you can run the server using the following command:

```bash
npm start
```
Alternatively, for development:

```bash
npm run dev
```
This will run the server with nodemon for automatic restarts during development.
```bash
API Endpoints
User Routes
POST /api/auth/register: Register a new user.

POST /api/auth/login: Login and get a JWT token.
```
```bash
Task Routes
POST /api/tasks/create: Create a new task (users can only create tasks for themselves, admins can create tasks for anyone).

GET /api/tasks/getAll: Fetch tasks (users get their own tasks, admins get all tasks).

PUT /api/tasks/update/:taskId: Update a task (users can update their tasks, admins can update any task).

DELETE /api/tasks/delete/:taskId: Delete a task (users can delete their tasks, admins can delete any task).

PUT /api/tasks/assign: Admin assigns a task to a user.
```
Real-Time Notifications
When a task is assigned or updated, all connected clients will receive real-time notifications using Socket.io.

Conclusion
This project provides a basic task management system where users can manage their tasks based on roles and receive notifications when tasks are assigned or updated in real-time.

Feel free to contribute to this project or use it as a base for building more complex task management systems.

markdown


### Explanation:
- **Basic Overview**: The README includes a short description of the project, its features, and the technologies used.
- **Installation**: Includes steps for cloning, installing dependencies, setting up environment variables, and running the project.
- **API Endpoints**: A list of the main API routes available.
- **Real-Time Feature**: Describes the real-time notification feature using **Socket.io**.

This README is simple and to the point, covering only essential details. You can expand 