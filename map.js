const http = require('http'),
      async = require('async'),
      concat = require('concat-stream');

async.map(process.argv.slice(2), (item, done) => {
  http.get(item, (res) => {
    res.pipe(concat((data) => {
      done(null, data.toString());
    }));
  }).on('error', (err) => {
    done(err);
  });
}, (err, results) => {
  if (err) return console.error(err);
  console.log(results);
})