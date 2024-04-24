const express = require("express");
const { getRoles, getUsers, register } = require("../controllers/auth");
const router = express.Router();

router.get("/", getRoles);
router.get("/users", getUsers);
router.put("/register", register);

module.exports = router;
