const http = require('http'),
      async = require('async')
      concat = require('concat-stream');

const url = process.argv[2],
      endCond = "meerkat";

var currStr = '',
    count = 0;

async.whilst(
  () => { return currStr.trim() !== endCond},
  (callback) => {
    http.get(url, (res) => {
      res.pipe(concat((data) => {
        currStr = data.toString();
        callback(null, ++count);
      }));
    }).on('error', callback);
  },
  (err, n) => {
    if (err) return console.log(err);
    console.log(n);
  }
);