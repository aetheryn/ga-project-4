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
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.get("/", getAppointments);
router.get("/seed", seedAppointments);
router.put("/", authUser, addAppointment);
router.patch("/:id", authUser, updateAppointmentStatus);
router.delete("/:id", authUser, deleteAppointment);
router.post("/doctor/:id", authUser, getAppointmentsByDoctor);
router.post("/doctor/pending/:id", authUser, getUpcomingAppointmentsByDoctor);
router.post("/patient/:id", authUser, getAppointmentsByPatient);
router.post("/patient/pending/:id", authUser, getUpcomingAppointmentsByPatient);

module.exports = router;
