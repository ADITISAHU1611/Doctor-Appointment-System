const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Routes
router.post('/book', appointmentController.bookAppointment);
router.get('/view/:email', appointmentController.viewAppointment);
router.get('/doctor/:doctor', appointmentController.viewDoctorAppointments);
router.delete('/cancel', appointmentController.cancelAppointment);
router.put('/modify', appointmentController.modifyAppointment);

module.exports = router;
