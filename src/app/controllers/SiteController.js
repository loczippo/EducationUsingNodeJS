const Course = require('../models/Course');
const Account = require('../models/Account');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        // Course.find({})
        //     .then((courses) => {
        //         res.render('courses/courses', {
        //             courses: mutipleMongooseToObject(courses),
        //         });
        //     })
        //     .catch(next);
        Promise.all([Course.find({}), Account.findOne({_id: req.cookies.UserId})])
        .then(([courses, account]) => {
            if(!account) {
                res.render('courses/courses', {
                    courses: mutipleMongooseToObject(courses),  
                });
                return;
            }
            res.render('courses/courses', {
                courses: mutipleMongooseToObject(courses),
                username: account.username,
                id: account._id
            });
        })
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
