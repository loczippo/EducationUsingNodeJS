const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Lesson = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String },
        videoId: { type: String, required: true },
        tag: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

Lesson.query.sortableLesson = function(req) {
    const isValidtype = ['asc', 'desc'].includes(req.query.type)
    if(req.query.hasOwnProperty('_sort')) {
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        })
    }
    return this;
  }

// Add plugins
mongoose.plugin(slug);
Lesson.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Lesson', Lesson);
