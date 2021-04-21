const express = require('express');
const router = express.Router();

const manageController = require('../app/controllers/ManageController');

router.get('/stored/exams', manageController.storedExams);
router.get('/stored/users', manageController.storedUsers);
router.get('/trash/lessons', manageController.trashLessons);
router.get('/stored/lessons', manageController.storedLessons);
router.get('/trash/lessons', manageController.trashLessons);
router.get('/stored/courses', manageController.storedCourses);
router.get('/trash/courses', manageController.trashCourses);

module.exports = router;
