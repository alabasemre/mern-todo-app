const express = require("express");

const { signup, signin, getMe } = require("./user.controller");
const { protect } = require("../../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/me", protect, getMe);

module.exports = userRouter;
