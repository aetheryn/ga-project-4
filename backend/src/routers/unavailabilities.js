const express = require("express");
const {
  getUnavailibilities,
  addUnavailabilities,
  removeUnavailabilities,
  getUnavailabilitiesByDoctor,
  seedUnavailabilities,
} = require("../controllers/unavailabilities");
const router = express.Router();

router.get("/", getUnavailibilities);
router.get("/seed", seedUnavailabilities);
router.put("/", addUnavailabilities);
router.delete("/:id", removeUnavailabilities);
router.post("/doctor/:id", getUnavailabilitiesByDoctor);

module.exports = router;
