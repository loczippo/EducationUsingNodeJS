const Course = require('../models/Course');
const Account = require('../models/Account');
const Lesson = require('../models/Lesson');
const Exam = require('../models/Exam');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class ExamController {
    index(req, res, next) {
        Promise.all([Course.find({}), Account.findOne({_id: req.cookies.UserId})])
        .then(([courses, account]) => {
            if(!account) {
                res.render('exam/exam', {
                    courses: mutipleMongooseToObject(courses),  
                });
                return;
            }
            res.render('exam/exam', {
                courses: mutipleMongooseToObject(courses),
                username: account.username,
                id: account._id
            });
        })
    }
    createExam(req, res, next) {
        Promise.all([Account.findOne({_id: req.cookies.UserId}),Course.find({})])
            .then(([account,tag]) =>
                res.render('exam/create', {
                    tag: mutipleMongooseToObject(tag),
                    username: account.username
                }),
            )
            .catch(next);
    }
    stored(req, res, next) {
        const exam = new Exam(req.body);
        exam
            .save()
            .then(() => res.redirect('/exam/create'))
            .catch((error) => {res.send(error['_message'])});
    }
    thithu(req, res, next) {
        Promise.all([Account.findOne({_id: req.cookies.UserId}), Exam.find({tag: req.params.tag})])
            .then(([account, exam]) => {
                res.render('exam/thithu', {
                    tag: req.params.tag,
                    username: account.username,
                    exam: mutipleMongooseToObject(exam),
                })
            })
        
    }
    thithu_exe(req, res, next) {
        res.send(req.body);
    }
}

module.exports = new ExamController();