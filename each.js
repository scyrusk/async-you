const http = require('http'),
      async = require('async');

async.each(process.argv.splice(2, 2), (item, done) => {
  http.get(item, (res) => {
    res.on('end', () => {
      return done();
    });
  }).on('error', (err) => {
    done(err);
  });
}, (err) => {
  if (err) console.log(err);
});