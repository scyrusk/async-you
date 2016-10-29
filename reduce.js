const http = require('http'),
      async = require('async')
      concat = require('concat-stream');

const url = process.argv[2],
      queryParams = ['one', 'two', 'three'];

async.reduce(queryParams, 0, (memo, item, callback) => {
  http.get(url + '?number=' + item, (res) => {
    res.pipe(concat((data) => {
      callback(null, memo + Number(data.toString()))
    }));
  }).on('error', callback);
}, (err, result) => {
  if (err) return console.log(err);
  console.log(result);
});