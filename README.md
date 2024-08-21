# School Management System

The **School Management System** is a comprehensive platform designed to facilitate the efficient management of school operations. This system integrates various functionalities essential for managing students, teachers, classrooms, and courses. The platform is developed using **Spring Boot** on the backend and **Angular** on the frontend, ensuring a robust and scalable solution.

## Key Features
- **Teacher Management:** Add, update, and assign teachers to specific classrooms and courses.
- **Classroom Management:** Manage classroom details, including room assignments and schedules.
- **Student Enrollment:** Enroll students in various courses and assign them to classrooms.
- **Course Management:** Create and manage course offerings, including course details and schedules.
- **User Authentication:** Secure login system with role-based access, ensuring that only administrators can access certain functionalities.
- **RESTful API:** Expose APIs for seamless integration with other systems or for building additional frontend applications.
- **JWT-Based Security:** Implemented JWT authentication for secure and stateless sessions.
- **Dockerized Deployment:** The application is containerized using Docker, allowing for easy deployment and scalability on cloud platforms like AWS.

## Technologies Used
- **Backend:** Spring Boot, Spring Security, Hibernate, PostgreSQL
- **Frontend:** Angular, Angular Material
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker, Docker Compose
- **Database:** PostgreSQL

## Project Structure
- **Backend:** Handles all the business logic, RESTful APIs, and database interactions.
- **Frontend:** Provides a responsive and intuitive user interface for managing school operations.
- **Database:** Stores all the necessary data for managing users, teachers, students, classrooms, and courses.

## Getting Started
### Prerequisites
- **Docker:** Ensure Docker is installed and running on your machine.

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/schoolmanagement.git
   cd schoolmanagement
   
## Build and Run using Docker Compose

To build and run the application using Docker Compose, follow these steps:
   ```bash
   docker-compose up --build


Once the containers are up and running, you can access the application through your browser:
   
   Frontend (Angular): http://localhost:4200
   Backend (Spring Boot): http://localhost:8080

   
