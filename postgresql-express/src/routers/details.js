const express = require("express");
const { getDetails, addDetails } = require("../controllers/details");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.get("/", getDetails);
router.put("/", authUser, addDetails);

module.exports = router;
