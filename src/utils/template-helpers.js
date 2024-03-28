const moment = require('moment');

moment.locale('uk');

const formatDate = (date) => {
  if (!date) return '';

  return moment(date).format('DD.MM.YYYY, HH:mm');
};

const spliceContent = (content, to = 100) => {
  if (content.length > to) {
    return content.substring(0, to) + '...';
  }

  return content;
};

const isEquals = (a = '', b = '') => a.toString() === b.toString();

const isActive = (currentUrl, target) => {
  return currentUrl === target ? 'active' : '';
};

module.exports = {
  formatDate,
  spliceContent,
  isEquals,
  isActive
};
