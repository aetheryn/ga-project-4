const express = require("express");
const {
  getAppointments,
  addAppointment,
  seedAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
  getUpcomingAppointmentsByDoctor,
  getUpcomingAppointmentsByPatient,
} = require("../controllers/appointments");
const router = express.Router();

router.get("/", getAppointments);
router.get("/seed", seedAppointments);
router.put("/", addAppointment);
router.patch("/:id", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);
router.post("/doctor/:id", getAppointmentsByDoctor);
router.post("/doctor/pending/:id", getUpcomingAppointmentsByDoctor);
router.post("/patient/:id", getAppointmentsByPatient);
router.post("/patient/pending/:id", getUpcomingAppointmentsByPatient);

module.exports = router;
