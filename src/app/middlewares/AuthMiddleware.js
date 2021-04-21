const Account = require('../../app/models/Account');

module.exports.requireAuth = function(req, res, next) {
    // res.send(req.cookies.UserId);
    Account.findOne({_id: req.cookies.UserId})
        .then(() => {
            
        })
        .catch(() => {
            res.render('account/login', {status: 'Đầu tiên: bạn phải đăng nhập'});
        })
    if(!req.cookies.login_action) {
        res.render('account/login', {status: 'Đầu tiên: bạn phải đăng nhập'});
    }
    else if(req.cookies.login_action != 'true') {
        res.render('account/login', {status: 'Đầu tiên: bạn phải đăng nhập'});
    }
    else if(!req.cookies.UserId) {
        res.render('account/login', {status: 'Đầu tiên: bạn phải đăng nhập'});
    }
    next();
}