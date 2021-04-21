const express = require('express');
const router = express.Router();

const LearningController = require('../app/controllers/LearningController');
const AdminMiddleware = require('../app/middlewares/AdminMiddleware');

router.post('/handle-form-actions', LearningController.handleFormAction)
router.post('/store', LearningController.store)
router.get('/create',AdminMiddleware.require, LearningController.create)
router.get('/:id/edit', LearningController.edit);
router.put('/:id', LearningController.update);
router.get('/:id/restore', LearningController.restore);
router.delete('/:id', LearningController.destroy);
router.delete('/:id/force', LearningController.forceDestroy);
router.get('/:tag/:slug', LearningController.show);
router.get('/:slug', LearningController.check);
router.get('/', LearningController.index);

module.exports = router;
