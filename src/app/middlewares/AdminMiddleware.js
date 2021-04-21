
const Account = require('../../app/models/Account');

module.exports.require = function(req, res, next) {
    Account.findOne({_id: req.cookies.UserId})
        .then((account) => {
            if(account.username !== 'admin') {
                res.redirect('/');
            }
        })
    next();
}