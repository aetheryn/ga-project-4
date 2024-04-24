const express = require("express");
const { getUsers, getUser, updateUser } = require("../controllers/users");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.get("/", getUsers);
router.post("/:id", getUser);
router.patch("/:id", authUser, updateUser);

module.exports = router;
