const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortableCourse: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default'
      const icons = {
        default: 'oi oi-elevator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending',
      };
      const types = {
        default: 'desc',
        desc: 'asc',
        asc: 'desc',
      };
      const icon = icons[sortType];
      const type = types[sortType]
      const href = Handlebars.escapeExpression(`/manage/stored/courses?_sort&column=${field}&type=${type}`)
      const result = `<a href="${href}">
        <span class="${icon}"></span>
      </a>`;
      return new Handlebars.SafeString(result)
    },
    sortableLesson: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default'
      const icons = {
        default: 'oi oi-elevator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending',
      };
      const types = {
        default: 'desc',
        desc: 'asc',
        asc: 'desc',
      };
      const icon = icons[sortType];
      const type = types[sortType]
      const href = Handlebars.escapeExpression(`/manage/stored/lessons?_sort&column=${field}&type=${type}`)
      const result = `<a href="${href}">
        <span class="${icon}"></span>
      </a>`;
      return new Handlebars.SafeString(result)
    },
    sortableAccount: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default'
      const icons = {
        default: 'oi oi-elevator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending',
      };
      const types = {
        default: 'desc',
        desc: 'asc',
        asc: 'desc',
      };
      const icon = icons[sortType];
      const type = types[sortType]
      const href = Handlebars.escapeExpression(`/manage/stored/users?_sort&column=${field}&type=${type}`)
      const result = `<a href="${href}">
        <span class="${icon}"></span>
      </a>`;
      return new Handlebars.SafeString(result)
    }  
}