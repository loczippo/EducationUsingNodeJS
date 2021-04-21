const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Account = require('../models/Account');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class LearningController {
    index(req, res, next) {
        res.send("404")
    }
    //[GET] /learning/:slug
    check(req, res, next) {
        Lesson.findOne({tag: req.params.slug})
            .then((lesson) => {
                if(lesson) {
                    res.redirect('/learning/'+lesson.tag+'/'+lesson.slug)
                }
                else {
                    res.json({'Error (404)': 'Không có bài học nào trong khoá học này!!!'})
                }
            })
            
    }
    //GET learning/:tag/:slug
    show(req, res, next) {
        Promise.all([Lesson.find({tag: req.params.tag}), Lesson.findOne({tag: req.params.tag, slug: req.params.slug}),Account.findOne({_id: req.cookies.UserId})])
            .then(([lessons, lesson, account]) => {
                if(!account) {
                    res.render('learning/lessons', {
                        lessons: mutipleMongooseToObject(lessons),
                        lesson: lesson.videoId
                    })
					return;
                }
				if(account) {
					if(lesson) {
						res.render('learning/lessons', {
						lessons: mutipleMongooseToObject(lessons),
						lesson: lesson.videoId,
						tag: lesson.tag,
						name: lesson.name,
						username: account.username,
						id: account._id
					})
					return;
					}
					else {
						res.json({err: 'làm gì có bài học này?'});
					}
				}
            })
    }
    // [GET] /learning/create
    create(req, res, next) {
        Promise.all([Course.find({}), Account.findOne({_id: req.cookies.UserId})])
            .then(([tag, account]) => {
                if(account) {
                    res.render('learning/create', {
                        tag: mutipleMongooseToObject(tag),
                        username: account.username
                    })
                }
            })
            .catch(()=> { res.render('learning/create')})
    }

    // [POST] /learning/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const lesson = new Lesson(req.body);
        lesson
            .save()
            .then(() => res.redirect('/manage/stored/lessons'))
            .catch((error) => {});
    }

    // [GET] /learning/:id/edit
    edit(req, res, next) {
        Promise.all([Account.findOne({_id: req.cookies.UserId}),Course.find({}),Lesson.findById(req.params.id)])
            .then(([account,tag,lesson]) =>
                res.render('learning/edit', {
                    tag: mutipleMongooseToObject(tag),
                    lesson: mongooseToObject(lesson),
                    username: account.username
                }),
            )
            .catch(next);
    }

    // [PUT] /learning/:id
    update(req, res, next) {
        Lesson.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/manage/stored/lessons'))
            .catch(next);
    }

    // [DELETE] /learning/:id
    destroy(req, res, next) {
        Lesson.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /learning/:id/force
    forceDestroy(req, res, next) {
        Lesson.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /learning/:id/restore
    restore(req, res, next) {
        Lesson.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //POST /learning/handle-form-actions
    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Lesson.delete({_id: {$in: req.body.lessonIDs}})
                    .then(() => res.redirect('back'))
                    .catch(next)
            break;
            case 'restore':
                Lesson.restore({_id: {$in: req.body.lessonIDs}})
                    .then(() => res.redirect('back'))
                    .catch(next)
            break;
            case 'forcedelete':
                Lesson.deleteOne({_id: {$in: req.body.lessonIDs}})
                    .then(() => res.redirect('back'))
                    .catch(next)
            break;
            default: res.json({message: 'Khong ton tai action nay'});
        }
    }
}

module.exports = new LearningController();
