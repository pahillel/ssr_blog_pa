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

module.exports = {
  formatDate,
  spliceContent
};
