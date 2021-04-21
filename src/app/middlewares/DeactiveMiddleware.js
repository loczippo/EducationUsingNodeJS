const Account = require('../../app/models/Account');
module.exports.check = function(req, res, next) {
    Account.findOne({_id: req.cookies.UserId})
        .then((account) => {
            if(account) {
				if(account.status === 'deactive') {
                res.cookie('UserId', 'null', { expires: new Date(Date.now(0)), httpOnly: true })
                res.cookie('login_action', 'null', { expires: new Date(Date.now(0)), httpOnly: true })
                res.render('account/login', {status: 'Đăng nhập thất bại: tài khoản của bạn chưa được kích hoạt!!!'});
				return;
            }
        }})
    next();
}