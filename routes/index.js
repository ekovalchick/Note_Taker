const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');


const app = express();

//second piece of url
//http://localhost:3001/api/notes
app.use('/notes', notesRouter);


module.exports = app;
