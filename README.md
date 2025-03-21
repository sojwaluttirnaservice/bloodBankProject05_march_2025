# Blood Bank Project

## Overview

This project consists of a server-side API and a client-side application. The server is built with Node.js and Express, while the client is built with Vite and Tailwind CSS.

## Prerequisites

-   Node.js (v14 or higher)
-   npm (v6 or higher)

## Getting Started

### Server

1. Navigate to the `api` directory:

    ```sh
    cd api
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `api` directory(if not created) and add the necessary environment variables. Refer to `.env.example` if available. Ensure you have specified the database name in the `.env` file.
   Ensure the datbase with the required name is already created on mysql server.

4. Create the database schema:

    ```sh
    npm run dbSync
    ```

5. Start the server:

    ```sh
    npm start
    ```

    The server should now be running on `http://localhost:3001`.

### Client

1. Navigate to the `client` directory:

    ```sh
    cd client
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `client` directory and add the necessary environment variables. Refer to `.env.example` if available.

4. Start the client:

    ```sh
    npm run dev
    ```

    The client should now be running on `http://localhost:5173`.

## Project Structure

### Server (`api`)

-   `app.js`: Main application file.
-   `asyncHandler.js`: Utility for handling asynchronous operations.
-   `bin/`: Contains scripts for database synchronization and other tasks.
-   `config/`: Configuration files for database connections and ORM.
-   `controllers/`: Controllers for handling API requests.
-   `middlewares/`: Middleware functions.
-   `models/`: Database models.
-   `routes/`: API routes.
-   `schemas/`: Validation schemas.
-   `utils/`: Utility functions.

### Client (`client`)

-   `index.html`: Main HTML file.
-   `src/`: Source code for the client application.
-   `public/`: Public assets.
-   `utils/`: Utility functions.
-   `tailwind.config.js`: Tailwind CSS configuration.
-   `vite.config.js`: Vite configuration.

## License

This project is licensed under the MIT License.
