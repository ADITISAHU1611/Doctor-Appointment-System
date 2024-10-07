const { getAppointments, setAppointments } = require('../data/appointments');

const availableDoctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'];

// Book appointment
exports.bookAppointment = (req, res) => {
    const { firstName, lastName, email, timeSlot, doctor } = req.body;

    if (!availableDoctors.includes(doctor)) {
        return res.status(400).json({ message: 'Invalid doctor' });
    }

    const newAppointment = { firstName, lastName, email, timeSlot, doctor };
    const appointments = getAppointments();

    // Check if doctor is available for that slot
    const doctorAppointments = appointments.filter(app => app.doctor === doctor && app.timeSlot === timeSlot);
    if (doctorAppointments.length > 0) {
        return res.status(400).json({ message: 'Time slot is already booked for this doctor' });
    }

    appointments.push(newAppointment);
    setAppointments(appointments);
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
};

// View appointment by email
exports.viewAppointment = (req, res) => {
    const { email } = req.params;
    const appointments = getAppointments();
    const appointment = appointments.find(app => app.email === email);

    if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ appointment });
};

// View all appointments for a doctor
exports.viewDoctorAppointments = (req, res) => {
    const { doctor } = req.params;
    const appointments = getAppointments();
    const doctorAppointments = appointments.filter(app => app.doctor === doctor);

    res.status(200).json({ doctorAppointments });
};

// Cancel appointment
exports.cancelAppointment = (req, res) => {
    const { email, timeSlot } = req.body;
    let appointments = getAppointments();
    const appointmentIndex = appointments.findIndex(app => app.email === email && app.timeSlot === timeSlot);

    if (appointmentIndex === -1) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    appointments.splice(appointmentIndex, 1);
    setAppointments(appointments);
    res.status(200).json({ message: 'Appointment cancelled successfully' });
};

// Modify appointment
exports.modifyAppointment = (req, res) => {
    const { email, originalTimeSlot, newTimeSlot } = req.body;
    let appointments = getAppointments();
    const appointmentIndex = appointments.findIndex(app => app.email === email && app.timeSlot === originalTimeSlot);

    if (appointmentIndex === -1) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if new time slot is available for the same doctor
    const doctor = appointments[appointmentIndex].doctor;
    const doctorAppointments = appointments.filter(app => app.doctor === doctor && app.timeSlot === newTimeSlot);
    if (doctorAppointments.length > 0) {
        return res.status(400).json({ message: 'New time slot is already booked' });
    }

    // Update time slot
    appointments[appointmentIndex].timeSlot = newTimeSlot;
    setAppointments(appointments);
    res.status(200).json({ message: 'Appointment updated successfully', appointment: appointments[appointmentIndex] });
};
