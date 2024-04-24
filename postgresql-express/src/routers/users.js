const express = require("express");
const { getUsers, getUser } = require("../controllers/users");
const router = express.Router();

router.get("/", getUsers);
router.post("/:id", getUser);

module.exports = router;
