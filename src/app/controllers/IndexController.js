
const Account = require('../models/Account');
class IndexController {
    index(req, res,next) {
        Account.findOne({_id: req.cookies.UserId})
            .then((account) => {
                if(!account) {
                    return res.render('home')
                }if(account.username === 'admin') {
                    res.render('home', {coin: account.coin, username: account.username, id: account._id, isAdmin: true})
                    return;
                }
                res.render('home', {username: account.username, id: account._id})
            })
    }
}
module.exports = new IndexController();