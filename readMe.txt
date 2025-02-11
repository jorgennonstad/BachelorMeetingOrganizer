Bachelor Meetings Organizer

## Overview
This application is built with the MERN stack (MongoDB, Express, React, Node.js). It helps you and your bachelor group manage meetings and tasks. The app includes features for logging meetings, managing to-do lists, and secure login/authentication. It supports adding, editing, and deleting meeting records, as well as organizing tasks with categorized lists and checklists.

## Features
- **Meetings**:
  - Add/Edit/Delete meeting information including Date, Status, Participants, Location, Agenda, and Notes.
  
- **To-Do List**:
  - Organize tasks into categorized lists.
  - Manage to-do checklists under each category.

- **Authentication**:
  - Login/Register functionality that generates a JWT token.
  - Role-based authentication for accessing and managing meetings and to-do lists (Admins only).
  - Secure routing that ensures only logged-in users can view meetings and to-do lists.

## Setup Instructions
#laste ned backendfiler
npm install

#laste ned frontend filer
cd client 
npm install

#run backend
nodemon server.js

#run frontend
/cd client 
npm start

### Requirements
1. **MongoDB**: You need a MongoDB instance running and an URI to connect.
2. **JWT_SECRET**: A secret for JWT token generation.

### Environment Variables
Create a `.env` file in the root directory and add the following values:

```env
MONGODB_URI=<your_mongo_db_uri>
PORT=<your_backend_port>
REACT_APP_API_URL=http://localhost:<your_port>

JWT_SECRET=<your_jwt_secret>



