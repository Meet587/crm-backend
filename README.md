# Tanya CRM

A property brokerage CRM built with React, TypeScript, Vite (frontend), and NestJS, PostgreSQL, TypeORM (backend).

## Frontend

### Tech Stack

- React, TypeScript, Vite
- React Router for navigation
- Redux for state management
- Axios for API requests

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Meet587/crm-frontend
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start development server:
   ```sh
   npm run dev
   ```
4. Build for production:
   ```sh
   npm run build
   ```

### Features Implemented

- Agent authentication
- Role-based access control (RBAC)
- Property management (Add, Edit, List, Delete)

## Backend

### Tech Stack

- NestJS, TypeScript
- PostgreSQL with TypeORM
- Swagger for API documentation
- JWT authentication

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Meet587/crm-backend
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up database (PostgreSQL required).

4. Start the backend server:
   ```sh
   npm run start:dev
   ```

### Features Implemented

- Agent authentication with JWT
- Role-based guards for access control
- Property management CRUD APIs
- Swagger API documentation (available at `/api-docs` when running locally)

## Deployment Plan

- AWS Ubuntu server with Nginx as a reverse proxy
- Domain is already purchased
- Deployment steps will be documented once finalized

## Future Updates

- Add environment variables
- Configure deployment and CI/CD pipeline

## License

This project is private and not intended for public use.