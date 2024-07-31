# mobigic_assignment

# File Upload and Management System

This project implements a file upload and management system using Node.js, Express.js, and MySQL for the backend. Users can register, log in, upload files with a unique 6-digit code, view their uploaded files, remove files, and download files using a code verification system.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

1. User registration with username and password.
2. User login functionality.
3. File upload functionality with unique 6-digit code generation for each uploaded file.
4. Files saved on the file system for future retrieval.
5. Logged-in users can view the list of their uploaded files.
6. Logged-in users can permanently remove files from their profile.
7. Files available for download using a URL, with a 6-digit code verification for access.

## Technologies Used

- Node.js
- Express.js
- MySQL
- Multer (for file uploads)
- JWT (for authentication)

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- MySQL

### Installation

1. **Clone the repository:**
    ```bash
    git clone [GitHub Repository Link for Backend]
    cd [repository-name]
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up MySQL database:**
   - Create a new database in MySQL.
   - Run the provided SQL script to set up the necessary tables.

4. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     DB_HOST=your-database-host
     DB_USER=your-database-username
     DB_PASSWORD=your-database-password
     DB_NAME=your-database-name
     JWT_SECRET=your-jwt-secret
     ```

### Running the Server

1. **Start the server:**
    ```bash
    npm start
    ```

2. The server should now be running on `http://localhost:3000`.

## API Endpoints

### User Registration

- **Endpoint:** `POST /register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "your-username",
    "password": "your-password"
  }

