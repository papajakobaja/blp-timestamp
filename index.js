// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Middleware to parse the date
app.get('/api/:date?', (req, res) => {
  let date;

  // Check if the date is empty, if yes use the current date
  if (!req.params.date) {
    date = new Date();
  } else {
    // If the date is a valid Unix timestamp (only digits), convert it to a number
    if (/^\d+$/.test(req.params.date)) {
      date = new Date(parseInt(req.params.date));
    } else {
      // Parse the date string
      date = new Date(req.params.date);
    }
  }

  // If the date is invalid, return error
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // Prepare the response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
