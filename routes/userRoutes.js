const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
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

//GET ALL DOC
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// BOOKING AVAILABILITY
router.post(
  "/booking-availability",
  authMiddleware,
  bookingAvailabilityController
);

//Appointments list
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
