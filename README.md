# "Goddess Within" - MERN eCommerce app

## Description

An eCommerce app built with MERN stack, and utilizes third party API's. This eCommerce app enable two main different flows or implementations:

1. Buyers browse the app categories, products and brands
2. Admins manage and control the entire app components (products, orders, users)

- Features:
  - Node provides the backend environment for this application
  - Express middleware is used to handle requests, routes
  - Mongoose schemas to model the application data
  - React for displaying UI components
  - Redux Toolkit to manage application's state
  - RTK Query API to handle asynchronous redux actions

## Quickstart Guide

Here is a guide on how to run this project locally.

Clone the repository

```
$ git clone https://github.com/Fastdrecad/goddess-within-app.git
```

## Backend Configuration

To configure the backend, follow these steps:

1. **Environment File**: Navigate to the `project` folder and add `.env` file. Update the values for the following contents in the `.env` file:

```
MONGO_URI=
PORT=
JWT_SECRET=
CLIENT_URL=
PAYPAL_CLIENT_ID=
PAYPAL_APP_SECRET=
PAYPAL_API_URL=
```

2. **MongoDB Setup**:

   - Sign up for an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a new cluster and follow the instructions to set up a new database.
   - Once set up, obtain your MongoDB connection string and add it to the `MONGO_URI` variable in your `.env` file.

3. **JWT_SECRET**:
   - This just needs to be any long, random string. You can google "secret key generator".

### Database Seed

- The seed command will create an admin user in the database
- The email and password are passed with the command as arguments
- Like below command, replace brackets with email and password.
- For more information, see code [here](server/utils/seed.js)

```
npm run seed:db [your-email] [your-password] // This is just an example.
```

## Frontend Configuration

1. **Environment File**: Navigate to the `client` folder and create a file: `.env`:

   ```plaintext
   API_URL=
   ```

## Running the Application

1. **Backend**:

   - Navigate to the `server` directory.
   - Install dependencies: `npm install`.
   - Start the server: `npm run dev`.

2. **Frontend**:
   - Open a new terminal and navigate to the `client` directory.
   - Install dependencies: `npm install`.
   - Start the frontend application: `npm run dev`.
   - The application should now be running on `http://localhost:3000` but verify this in your command line terminal

## Demo

This application is deployed on Render.
Please check it out [here](https://goddess-within-app.onrender.com/).

## Install

Some basic Git commands are:

```
$ git clone https://github.com/Fastdrecad/goddess-within-app.git
$ cd project
$ npm install
```

## Start development

```
$ npm run dev
```

## Simple build for production

```
$ npm run build
```

## Run build for production

```
$ npm start
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)
