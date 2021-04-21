const newsRouter = require('./news');
const managerRouter = require('./manager');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const learningRouter = require('./learning');
const authRouter = require('./auth');
const indexRouter = require('./indexRouter');
const examRouter = require('./examRouter');
const AuthMiddleware = require('../app/middlewares/AuthMiddleware');
const AdminMiddleware = require('../app/middlewares/AdminMiddleware');
const DeactiveMiddleware = require('../app/middlewares/DeactiveMiddleware');

function route(app) {
    app.use('/exam',DeactiveMiddleware.check, examRouter);
    app.use('/auth',DeactiveMiddleware.check, authRouter);
    app.use('/news', newsRouter);
    app.use('/manage',DeactiveMiddleware.check, AuthMiddleware.requireAuth,AdminMiddleware.require, managerRouter);
    app.use('/learning',DeactiveMiddleware.check,AuthMiddleware.requireAuth, learningRouter);
    app.use('/courses',DeactiveMiddleware.check, coursesRouter);
    app.use('/danhsachkhoahoc',DeactiveMiddleware.check, siteRouter);
    app.use('/',DeactiveMiddleware.check, indexRouter);
}

module.exports = route;
