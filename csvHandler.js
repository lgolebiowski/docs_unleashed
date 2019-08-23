// package use to transform json to csv string
const stringify = require('csv-stringify');

function downloadCsv(data, req, res) {
  // adding appropriate headers, so browsers can start downloading
  // file as soon as this request starts to get served
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Pragma', 'no-cache');

  stringify(posts, { header: true })
    .pipe(res);
};

module.exports = {
  downloadCsv
};
