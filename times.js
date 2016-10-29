const http = require('http'),
      async = require('async')
      concat = require('concat-stream');

const host = process.argv[2],
      port = process.argv[3],
      postPath = '/users/create',
      getURL = 'http://' + host + ':' + port + '/users';

async.series({
  create: (callback) => {
    async.times(5, (n, next) => {
      var user = JSON.stringify({ user_id: n+1 })

      var request = http.request({
        hostname: host,
        port: port,
        path: postPath,
        method: 'POST',
        headers: { "Content-Length": user.length }
      }, (res) => {
        res.on('data', () => {})
        res.on('end', () => {
          next();
        })
      });

      request.on('error', next);
      request.write(user);
      request.end();
    }, (err, result) => {
      if (err) return console.log(err);
      callback();
    })
  },

  fetch: (callback) => {
    http.get(getURL, (res) => {
      res.pipe(concat((data) => {
        callback(null, data.toString());
      }));
    }).on('error', callback);
  }
}, (err, results) => {
  if (err) return console.log(err);
  console.log(results.fetch);
});