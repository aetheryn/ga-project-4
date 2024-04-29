const express = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByFullname,
} = require("../controllers/users");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.get("/", getUsers);
router.post("/:id", getUser);
router.post("/", getUserByFullname);
router.patch("/:id", authUser, updateUser);
router.delete("/:id", authUser, deleteUser);

module.exports = router;
