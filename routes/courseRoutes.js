import express from "express";
import { addlecture, createcourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, authorizeSubscriber, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course (only admin)
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload , createcourse);

// Add Lecture, Delete course , get course details
router.route("/course/:id").get(isAuthenticated ,authorizeSubscriber,getCourseLectures).post(isAuthenticated ,authorizeAdmin, singleUpload,addlecture).delete(isAuthenticated,authorizeAdmin,deleteCourse);

// delete lecture
router.route("/lecture").delete(isAuthenticated , authorizeAdmin ,deleteLecture);

export default router;