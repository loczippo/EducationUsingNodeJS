const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Account = require('../models/Account');
const Exam = require('../models/Exam');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /manage/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}).sortableCourse(req), Course.countDocumentsDeleted(),Account.findOne({_id: req.cookies.UserId})])
            .then(([courses, deletedCount, account]) =>{
                if(account) {
                    res.render('manage/stored-courses', {
                        deletedCount,
                        courses: mutipleMongooseToObject(courses),	
                        username: account.username
                    })
                }
            })
            
    }

    // [GET] /manage/trash/courses
    trashCourses(req, res, next) {
        Promise.all([Course.findDeleted({}), Course.countDocuments(),Account.findOne({_id: req.cookies.UserId})])
            .then(([courses, countDocuments, account]) => {
                if(account) {
                    res.render('manage/trash-courses', {
                        courses: mutipleMongooseToObject(courses),
                        countDocuments,
                        username: account.username
                    })
                }
            })
            .catch(next)
    }
    // [GET] /manage/stored/lessons
    storedLessons(req, res, next) {
        Promise.all([Lesson.find({}).sortableLesson(req), Lesson.countDocumentsDeleted(), Account.findOne({_id: req.cookies.UserId})])
            .then(([lessons, deletedCount, account]) => {
                if(account) {
                res.render('manage/stored-lessons', {
                    deletedCount,
                    lessons: mutipleMongooseToObject(lessons),
                    username: account.username
                })
            }
        })
            .catch(next);
    }

    // [GET] /manage/trash/lessons
    trashLessons(req, res, next) {
        Promise.all([Lesson.findDeleted({}), Lesson.countDocuments(), Account.findOne({_id: req.cookies.UserId})])
            .then(([lessons, countDocuments, account]) => {
                if(account) {
                    res.render('manage/trash-lessons', {
                        lessons: mutipleMongooseToObject(lessons),
                        countDocuments,
                        username: account.username
                    })
                }
            })
            .catch(next)
    }
    storedUsers(req, res, next) {
        Promise.all([Account.find({}).sortableAccount(req), Account.findOne({_id: req.cookies.UserId})])
            .then(([accounts, account]) => {
                if(account) {
                    res.render('manage/stored-users', {
                        accounts: mutipleMongooseToObject(accounts),
                        username: account.username,
                    })
                }
        })
            .catch(next);
    }
    storedExams(req, res, next) {
        Promise.all([Course.find({}).sortableCourse(req), Course.countDocumentsDeleted(),Account.findOne({_id: req.cookies.UserId})])
            .then(([courses, deletedCount, account]) =>{
                if(account) {
                    res.render('manage/stored-courses', {
                        deletedCount,
                        courses: mutipleMongooseToObject(courses),	
                        username: account.username
                    })
                }
            })
    }
}

module.exports = new MeController();
