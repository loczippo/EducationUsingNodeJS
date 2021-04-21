const express = require('express');
const router = express.Router();
const examRouter = require('../app/controllers/ExamController.js')

router.post('/:tag/thithu', examRouter.thithu_exe);
router.get('/:tag/thithu', examRouter.thithu);
router.get('/create', examRouter.createExam);
router.post('/stored', examRouter.stored);
router.get('/', examRouter.index);
module.exports = router;