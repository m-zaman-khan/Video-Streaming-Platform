const express = require("express");
const { Login, Logout, Register } = require("../controllers/user.js");

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);

module.exports = router;
