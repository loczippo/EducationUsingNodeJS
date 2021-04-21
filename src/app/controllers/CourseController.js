const Course = require('../models/Course');
const Account = require('../models/Account');
const Lesson = require('../models/Lesson');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Promise.all([Course.findOne({ slug: req.params.slug }),Account.findOne({_id: req.cookies.UserId})])
                .then(([course,account]) => {
                    if(!account) {
                        Promise.all([Lesson.countDocuments({tag: course.tag}), Lesson.find({tag: course.tag})])
                        .then(([count, lessons]) => {
                            res.render('courses/show', {
                                lessons: mutipleMongooseToObject(lessons),
                                course: mongooseToObject(course),
                                sobaihoc: count
                            })
                        })
                        return;
                    }
                    Promise.all([Lesson.countDocuments({tag: course.tag}), Lesson.find({tag: course.tag})])
                        .then(([count, lessons]) => {
                            res.render('courses/show', {
                                lessons: mutipleMongooseToObject(lessons),
                                course: mongooseToObject(course),
                                username: account.username,
                                id: account._id,
                                sobaihoc: count
                            })
                        })
                })
                
    }

    // [GET] /courses/create
    create(req, res, next) {
        Account.findOne({_id: req.cookies.UserId})
            .then((account) => {
                res.render('courses/create', {username: account.username});
            })
            .catch(() => {res.render('courses/create')})
            
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/manage/stored/courses'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Promise.all([Account.findOne({_id: req.cookies.UserId}),Course.findById(req.params.id)])
            .then(([account,course]) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                    username: account.username,
                })
            })
            .catch((err) => {res.send(err)})
        
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/manage/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //POST /courses/handle-form-actions
    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIDs}})
                    .then(() => res.redirect('back'))
                    .catch(next)
            break;
            case 'restore':
                Course.restore({_id: {$in: req.body.courseIDs}})
                    .then(() => res.redirect('back'))
                    .catch(next)
            break;
            case 'forcedelete':
                Course.deleteOne({_id: {$in: req.body.courseIDs}})
                    .then(() => res.redirect('back'))
                    .catch(next)
            break;
            default: res.json({message: 'Khong ton tai action nay'});
        }
    }
}

module.exports = new CourseController();
