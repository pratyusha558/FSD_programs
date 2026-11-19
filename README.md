# FSD Programs

This repository contains my **class work for Full Stack Development (FSD)**. It collects the programs I wrote while learning how the frontend, backend and database of a web application work together.

## Topics Covered

- **Node.js and Express:** building a server, routes and middleware
- **EJS:** rendering dynamic pages with a template engine
- **MongoDB and Mongoose:** storing and retrieving data
- **CRUD operations:** Create, Read, Update and Delete
- **REST APIs:** handling requests with `GET`, `POST`, `PUT` and `DELETE`
- **React:** components, state (`useState`) and event handling

## Projects

| Folder | Description |
|---|---|
| `template-engine-ejs-app` | Express + EJS + MongoDB product app with add, view, edit and delete pages |
| `Non_persistent_app` | Express REST API that keeps data in memory (data resets when the server restarts) |
| `mongodb_express_app` | Express app connected to MongoDB Atlas |
| `react_state_events_app` | React app practising state and events |
| `react_frontend_crud_app` | React frontend with CRUD operations |

## Tech Stack

- Node.js
- Express.js
- EJS
- MongoDB / Mongoose
- React (Vite)
- Git and GitHub

## How to Run a Project

1. Clone the repository:
   ```bash
   git clone https://github.com/pratyusha558/FSD_programs.git
   ```
2. Go into a project folder:
   ```bash
   cd FSD_programs/<project-folder>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file if the project uses MongoDB:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=9999
   ```
5. Start the project:
   ```bash
   npm start        # Express projects
   npm run dev      # React (Vite) projects
   ```

## Note

These programs were written for learning purposes as part of my coursework.

## Author

**Pratyusha**
GitHub: [pratyusha558](https://github.com/pratyusha558)