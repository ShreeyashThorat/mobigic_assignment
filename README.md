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
- AWS S3 (for store files)

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- MySQL
- AWS S3

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/ShreeyashThorat/mobigic_assignment.git
    cd mobigic_assignment
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
     DB_HOST=_DB_HOST__
     DB_USER=__DB_USER__
     DB_PASSWORD=__DB_PASS__
     DB_DATABASE=_DB_NAME__
     PORT = __PORT__

     JWT_SECRET_KEY = _JWT_SECRET_KEY__
     JWT_EXP=__JWT_EXPIRY__

     AWS_BUCKET_NAME = _AWS_BUCKET_NAME_
     AWS_REGION = _AWS_REGION_
     AWS_SECRET_ACCESS_KEY = _AWS_SECRET_ACCESS_KEY_
     AWS_ACCESS_KEY_ID = _AWS_ACCESS_KEY_ID_
     ```

### Running the Server

1. **Start the server:**
    ```bash
    node index.js
    ```

2. The server should now be running on `http://localhost:3000`.

## API Endpoints

### User Registration

- **Endpoint:** `POST /create-user`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "email": "your-email",
    "firstName": "your-first-name",
    "lastName": "your-last-name",
    "dob": "your-dob"
    "password": "your-password"
  }


### User Login

- **Endpoint:** `POST /login`
- **Description:** Login a existing user.
- **Request Body:**
  ```json
  {
    "email": "your-email",
    "password": "your-password"
  }


### Upload file

- **Endpoint:** `POST /upload`
- **Description:** Upload file.
- **Request Header:**
  ```json
  {
    "Auth token": "Bearer token"
  }
- **Request File:**
  ```json
  {
    "file": "your-file"
  }

### Get files

- **Endpoint:** `GET /my-files`
- **Description:** Get uploaded files.
- **Request Body:**
- **Request Header:**
  ```json
  {
    "Auth token": "Bearer token"
  }


### Remove file

- **Endpoint:** `DELETE /delete-file`
- **Description:** Delete uploaded file.
- **Request Header:**
  ```json
  {
    "Auth token": "Bearer token"
  }
- **Request Query:**
  ```json
  {
    "media_id": "media_id",
  }


