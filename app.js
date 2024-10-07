const express = require('express');
const bodyParser = require('body-parser');

const appointmentRoutes = require('./routes/appointments');

const app = express();

// Middleware to parse request body
app.use(bodyParser.json());

// Route middleware
app.use('/appointments', appointmentRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
