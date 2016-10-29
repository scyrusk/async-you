const fs = require('fs'),
      http = require('http')
      async = require('async')

async.waterfall([
  (done) => {
    fs.readFile(process.argv[2], (err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  },
  (data, done) => {
    var reqBody = "";
    http.get(data.toString(), (res) => {
      res.on('data', (chunk) => {
        reqBody += chunk.toString();
      });

      res.on('end', (chunk) => {
        done(null, reqBody);
      })
    }).on('error', (error) => {
      done(error);
    });
  }
], (err, result) => {
  if (err) return console.error(err);
  console.log(result.toString());
});

// without waterfall:
// fs.readFile(process.argv[2], (err, data) => {
//   if (err) return console.error(err);
//   http.get(data.toString(), (res) => {
//     res.on("data", (chunk) => {
//       console.log(chunk.toString());
//     })
//   });
// });