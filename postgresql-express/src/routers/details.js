const express = require("express");
const {
  getDetails,
  addDetails,
  updateDetails,
} = require("../controllers/details");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.get("/", getDetails);
router.put("/", authUser, addDetails);
router.patch("/:id", authUser, updateDetails);

module.exports = router;
