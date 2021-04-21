const Account = require('../../app/models/Account')
module.exports.check = function(req, res, next) {
    Account.findOne({_id: req.cookies.UserId})
            .then((account) => {
                if(account) {
					if(req.cookies.UserId == account._id) {
                    return res.render('home');
                }}
            })
    next();
}