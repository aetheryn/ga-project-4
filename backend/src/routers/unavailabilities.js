const express = require("express");
const { getUnavailibilities } = require("../controllers/unavailabilities");
const router = express.Router();

router.get("/", getUnavailibilities);

module.exports = router;
