const http = require('http')
const async = require('async')

function getBodyFrom(url, callback) {
  var body = ''
  http.get(url, (res) => {
    res.on('data', (chunk) => {
      body += chunk.toString();
    });

    res.on('end', (chunk) => {
      callback(null, body);
    })
  }).on('error', (err) => {
    callback(err, null);
  });
}

async.series({
  requestOne: (done) => {
    getBodyFrom(process.argv[2], done)
  },
  requestTwo: (done) => {
    getBodyFrom(process.argv[3], done)
  }
}, (err, results) => {
  if (err) return console.error(err);
  console.log(results);
});