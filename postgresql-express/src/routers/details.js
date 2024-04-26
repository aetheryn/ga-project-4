const express = require("express");
const {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getDetailsByPatient,
} = require("../controllers/details");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.get("/", getDetails);
router.put("/", authUser, addDetails);
router.patch("/:id", authUser, updateDetails);
router.delete("/:id", authUser, deleteDetails);
router.post("/patient/:id", authUser, getDetailsByPatient);

module.exports = router;
