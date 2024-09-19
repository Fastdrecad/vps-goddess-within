require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
const helmet = require('helmet');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const keys = require('./config/keys');
const routes = require('./routes');
const setupDB = require('./utils/db');

const app = express();
const { port } = keys;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);

setupDB();

app.use(morgan('dev'));

// Define API routes
app.use(routes);

// Static folder setup (assuming your uploads directory is within the project)
// This allows to serve the uploaded images directly from the server
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Static folder setup for client-side application
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

// Serve the index.html file for all routes that are not API routes
app.get('*', (req, res) =>
  res.sendFile(path.resolve(clientDistPath, 'index.html'))
);

// Start the server
app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});

app.use(notFound);
app.use(errorHandler);
