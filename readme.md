A full-stack project management tool where users can create up to 4 projects, add/update/delete tasks, and manage task statuses (pending, in-progress, completed).

Features

- JWT-based authentication
- Maximum 4 projects per user
- Add, update, and delete tasks within projects
- Track task status
- Modal-based UI for task interactions
- Toast notifications for actions



Live Demo: 

// will be add


 Clone the Repository


git clone https://github.com/cb-here/task-tracker.git
cd task-tracker

Backend SetUp
cd backend 
npm install 

Create a .env file with the following values

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the backend 
npm run dev 

Frontend Setup
cd frontend
npm install

Create .env file with following value
VITE_API_URL=http://localhost:5000

Run the frontend
npm run dev