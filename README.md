
🧩 Express MySQL User CRUD App

A simple User Management System built using Node.js, Express, and MySQL.
This project demonstrates CRUD (Create, Read, Update, Delete) operations on a user database using EJS templates and RESTful APIs.

🚀 Features

Add new users through a form

View all users in a table

Edit and update user details

(Upcoming) Delete user feature

Uses MySQL as the database

Uses EJS as the templating engine

Follows RESTful API structure

🛠️ Tech Stack
Layer	Technology Used
Backend	Node.js, Express.js
Frontend	EJS (Embedded JavaScript Templates)
Database	MySQL
Styling	Basic HTML & CSS
Others	Faker.js for dummy data, Method-Override for PATCH requests

📌 Future Improvements

. Add delete functionality

. Add authentication system

. Improve UI using Tailwind or Bootstrap

. Add validation for form inputs

Setup Instructions
1. Clone the Repository

git clone https://github.com/mohdtajul/express-mysql-user-crud.git

2. Install Dependencies

npm install

3. Create .env File

In the root directory, create a .env file and add your database credentials:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=practice
PORT=8080

4. Start the MySQL Server

Make sure MySQL is running and your database (practice) exists with a user table:

CREATE TABLE user (
    id VARCHAR(100) PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100)
);

5. Run the App
npm start