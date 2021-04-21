const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Account = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        numberphone: { type: String, required: true },
        status: { type: String, default: 'active', required: true },
        coin: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },
);

Account.query.sortableAccount = function(req) {
    const isValidtype = ['asc', 'desc'].includes(req.query.type)
    if(req.query.hasOwnProperty('_sort')) {
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        })
    }
    return this;
  }

Account.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Account', Account);
