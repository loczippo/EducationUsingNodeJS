
const Account = require('../../app/models/Account')
const { mongooseToObject } = require('../../util/mongoose');
class AuthController {
    //GET /auth/signup
    indexSignUp(req, res, next) {
        res.render('account/signup');
    }
    //GET /auth/login
    indexLogin(req, res, next) {
        res.render('account/login');
    }
    //POST /auth/signup
    createAccount(req, res, next) {
        Promise.all([Account.findOne({username: req.body.username}),Account.findOne({email: req.body.email})])
           .then(([username,email]) => {
            if(username) {
                res.render('account/signup', {
                    status: 'Đăng ký tài khoản thất bại: tài khoản ' + username.username + ' đã được sử dụng!!!',
                    value: req.body
                })
                return;
            }
            else if(email) {
                res.render('account/signup', {
                    status: 'Đăng ký tài khoản thất bại: email ' + email.email + ' đã được sử dụng!!!',
                    value: req.body
                })
                return;
            }
            else if(req.body.password !== req.body.repassword) {
                res.render('account/signup', {
                    status: 'Đăng ký tài khoản thất bại: 2 mật khẩu không khớp với nhau!!!',
                    value: req.body
                })
                return;
            }
            else if(req.body.privacypolicy != 'on') {
                res.render('account/signup', {
                    status: 'Bạn phải đồng ý với các điều khoản của chúng tôi!!',
                    value: req.body
                })
                return;
            }
            else {
                const account = new Account(req.body);
                account.save()
                    .then(() => res.render('account/signup', {status: 'Đăng ký tài khoản thành công'}))
                    .catch(() => res.render('account/signup', {
                        status: 'Đăng ký tài khoản thất bại: đã có lỗi xảy ra',
                        value: req.body
                    }))
               }
           })
    }
    //POST auth/login
    loginAccount(req, res, next) {
        Account.findOne({username: req.body.username, password: req.body.password})
            .then((account) => {
                if(!account) {
                    res.render('account/login', {status: 'Đăng nhập thất bại: sai tên đăng nhập hoặc mật khẩu', value: req.body})
                    return;
                }
                res.cookie('UserId', account._id);
                res.cookie('login_action', 'true');
                res.redirect('/')
            })
            .catch(() => {
                res.render('account/login', {status: 'Đăng nhập thất bại: đã có lỗi xảy ra'})
            })
            
    }
    //GET auth/logout
    logout(req, res, next) {
        return res.cookie('UserId', 'null', { expires: new Date(Date.now(0)), httpOnly: true }) &&
        res.cookie('login_action', 'null', { expires: new Date(Date.now(0)), httpOnly: true })
    }
    changepassword(req, res, next) {
        Account.findOne({_id: req.cookies.UserId})
            .then((account) => {
                res.render('account/changepass', {
                    username: account.username,
                    id: account._id,
                    account: mongooseToObject(account)
                })
            })
    }
    changepassword_execute(req, res, next) {
        // Account.findOne({username: req.body.username, password: req.body.password})
        //     .then((account) => {
        //         if(!account) {
        //             res.render('account/changepass', {
        //                 status: 'Đổi mật khẩu thất bại: mật khẩu cũ không đúng',
        //                 value: req.body 
        //             })
        //             return;
        //         }
        //     })
        Promise.all([Account.findOne({_id: req.params.id, password: req.body.oldpassword}), Account.findOne({_id: req.params.id})])
            .then(([account, user]) => {
                if(!account) {
                    return res.render('account/changepass', {
                        status: 'Đổi mật khẩu thất bại: mật khẩu cũ không đúng',
                        id: req.params.id,
                        value: req.body,
                        username: user.username
                    })
                    return;
                }
                req.body.email = account.email;
                req.body.numberphone = account.numberphone;
                Account.updateOne({ _id: req.params.id }, req.body)
                    .then(() => res.render('account/changepass', {
                        status: 'Đổi mật khẩu thành công',
                        id: account._id,
                        username: account.username,
                        value: req.body
                    }))
                    .catch(() => res.render('account/changepass', {status: 'Đổi mật khẩu thất bại: đã có lỗi xảy ra'}));
                    })
            .catch(() => {
                res.json({err: 'không được đổi mật khẩu người khác'})
            })
    }

    editAccount(req, res, next) {
        Promise.all([Account.findById(req.params.id), Account.findById(req.cookies.UserId)])
                .then(([accounts, account]) => {
                    if(account) {
                        if(accounts.status === 'active') {
                            res.render('account/edit', {
                                accounts: mongooseToObject(accounts),
                                username: account.username,
                                active: true
                            })
                            return;
                        }
                        else {
                            return res.render('account/edit', {
                                accounts: mongooseToObject(accounts),
                                username: account.username,
                                active: false
                            }) 
                        }
                    }
                })
    }
    updateAccount(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/manage/stored/users'))
            .catch(next);
    }
}
module.exports = new AuthController();