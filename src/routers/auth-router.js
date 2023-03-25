const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/Auth");
const authModel = require('../models/auth')
const validator = require('../middleware/joi-validator')
router.post("/signup",validator(authModel.signup),AuthControllers.Signup);
router.post("/login", validator(authModel.login),AuthControllers.Login);

module.exports = router