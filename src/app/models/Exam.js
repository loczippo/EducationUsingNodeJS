const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Exam = new Schema(
    {
        cauhoi: { type: String, required: true },
        dapan1: { type: String, required: true },
        dapan2: { type: String, required: true },
        dapan3: { type: String, required: true },
        dapan4: { type: String, required: true },
        tag: { type: String, required: true },
        dapandung: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

Exam.query.sortableExam = function(req) {
    const isValidtype = ['asc', 'desc'].includes(req.query.type)
    if(req.query.hasOwnProperty('_sort')) {
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        })
    }
    return this;
  }

Exam.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Exam', Exam);
