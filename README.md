# CRM Backend

This is the backend for a CRM application.

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

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd crm-backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Update the variables in the `.env` file with your specific configuration (e.g., database credentials, JWT secrets).

## Running the Application

-   **Development Mode:**
    To run the application in development mode with hot-reloading:
    ```bash
    npm run start:dev
    ```
    The application will typically be available at `http://localhost:3000` (or the port specified in your `.env` file).

-   **Production Mode:**
    To build and run the application in production mode:
    ```bash
    npm run build
    npm run start:prod
    ```

## Available Scripts

In the project directory, you can run the following scripts:

-   `npm run build`: Compiles the TypeScript code to JavaScript.
-   `npm run format`: Formats the code using Prettier.
-   `npm run start`: Starts the application in development mode.
-   `npm run start:dev`: Starts the application in development mode with file watching for hot-reloading.
-   `npm run start:debug`: Starts the application in debug mode with file watching.
-   `npm run start:prod`: Starts the compiled application in production mode.
-   `npm run lint`: Lints the codebase using ESLint.
-   `npm run test`: Runs unit tests using Jest.
-   `npm run test:watch`: Runs unit tests in watch mode.
-   `npm run test:cov`: Generates a test coverage report.
-   `npm run test:debug`: Runs unit tests in debug mode.
-   `npm run test:e2e`: Runs end-to-end tests.

## API Documentation

This project uses Swagger to provide API documentation. Once the application is running, you can access the Swagger UI by navigating to `/api` in your browser (e.g., `http://localhost:3000/api`).

The API documentation provides detailed information about the available endpoints, request parameters, and response schemas.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these general guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix: `git checkout -b feature-name` or `bugfix-name`.
3.  Make your changes and commit them with clear and concise messages.
4.  Push your changes to your fork: `git push origin feature-name`.
5.  Create a pull request to the main repository's `main` or `develop` branch.

Please ensure your code adheres to the existing coding style and includes tests where applicable.

## Deployment Plan

- AWS Ubuntu server with Nginx as a reverse proxy
- Domain is already purchased
- Deployment steps will be documented once finalized

## Future Updates

- Add environment variables
- Configure deployment and CI/CD pipeline

## Features

- Authentication
- Builders Management
- Client Management
- Commissions Management
- Deals Management
- File Upload
- Follow-ups Management
- Property Management
- Site Visits Management
- User Management

## License

This project is UNLICENSED.