const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');
const AuthMiddleware = require('../app/middlewares/AuthMiddleware');
const AdminMiddleware = require('../app/middlewares/AdminMiddleware');

router.post('/handle-form-actions', courseController.handleFormAction)
router.get('/create',AuthMiddleware.requireAuth,AdminMiddleware.require, courseController.create);
router.post('/store',AuthMiddleware.requireAuth,AdminMiddleware.require, courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.get('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.get('/:slug', courseController.show);

module.exports = router;
