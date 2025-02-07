# WorkSphere

A web-based Employee Management System (EMS) that enables administrators to perform CRUD (Create, Read, Update, Delete) operations on employee records. The system includes authentication and authorization features and is built using React Vite for the frontend, Java Spring Boot for the backend, and PostgreSQL for the database.

## Features

- **Authentication & Authorization:** Secure login, logout, and user registration features.
- **CRUD Operations:** Create, read, update, and delete employee records.
- **Responsive UI:** Designed for a smooth user experience across different devices.
- **Real-Time Validations:** Form validation to ensure accurate data input.


## Technologies Used

### Frontend

- **React**: Frontend framework for building UI components
- **Vite**: Build tool for faster React development
- **React Router**: Client-side routing
- **Axios**: HTTP client for making requests to the backend

### Backend

- **Java**: Backend development
- **Spring Boot**: Framework for building RESTful APIs
- **PostgreSQL**: Database for storing user and employee information
- **Gradle**: Dependency management and build tool

## Installation

### Prerequisites

- Node.js (v14 or later)

1. Clone the repository:
   ```bash
   git clone https://github.com/MilindJain03/Worksphere.git
   ```
   
2. Navigate to the frontend directory:
   ```bash
   cd project-root/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the browser and navigate to `http://localhost:3000`.
2. Register as a new user or log in using existing credentials.
3. Once logged in, you can add, edit, or delete employee records.

## API Endpoints

| Endpoint             | Method | Description                        |
|----------------------|--------|------------------------------------|
| `/auth/register`     | POST   | Register a new user                |
| `/auth/login`        | POST   | Log in a user                      |
| `/employees`         | GET    | Get a list of all employees        |
| `/employees/{id}`    | GET    | Get details of a specific employee |
| `/employees`         | POST   | Create a new employee              |
| `/employees/{id}`    | PUT    | Update an existing employee        |
| `/employees/{id}`    | DELETE | Delete an employee                 |

## Screenshots

### login/register
![image](https://github.com/user-attachments/assets/4b2e2e47-05e3-4547-8294-35daea717984)
![image](https://github.com/user-attachments/assets/82bc361d-99d6-41bc-8758-a4142a77897b)
### Dashboard
![image](https://github.com/user-attachments/assets/331c48a6-5dba-44f0-b02b-bb8f0d543f9f)
### Add/Edit Entries
![image](https://github.com/user-attachments/assets/7f4cb05e-b0c8-4e0c-907e-df7f818f3705)
![image](https://github.com/user-attachments/assets/d049f6d1-917e-4aa9-8d1b-e314db35f9b3)
### Search by Name or Role
![image](https://github.com/user-attachments/assets/a9269527-2561-4846-aca4-d70a55115ff0)
### Delete Entries
![image](https://github.com/user-attachments/assets/95a87f6e-55cc-44d3-b145-d5479a26d1a3)
### Form validation
![image](https://github.com/user-attachments/assets/79f912f3-074f-4f70-9b88-03e69cf2e965)










