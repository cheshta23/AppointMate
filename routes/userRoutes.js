const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routes
//login ||post
router.post("/login", loginController);

//register || post
router.post("/register", registerController);

//Auth ||Post
router.post("/getUserData", authMiddleware, authController);

//Apply doctor ||Post
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//notification doctor ||post
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

//notification doctor ||post
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

module.exports = router;
