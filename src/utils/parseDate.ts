const moment = require('moment');

export const parseDate  = (date: string): string => {
  const formats = [
    moment.ISO_8601,
    "DD/MM/YYYY HH:mm:ss",
    "DD/MM/YYYY HH:mm"
  ];

  const parse = moment(date, formats, true);

  if (!parse.isValid()) {
    return date;
  }

  return parse.format('YYYY-MM-DD HH:mm:ss');
}
