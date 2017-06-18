const moment = require('moment');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", (req, res) => {
  var time = req.params.time;
  if (!moment(time).isValid() && !moment.unix(time).isValid()) {
    res.send(JSON.stringify({
      "unix": null,
      "natural": null
    }, undefined, 2));
  } else if (moment(time).isValid()) {
    res.send(JSON.stringify({
      "unix": moment(time).unix(),
      "natural": moment(time).format('MMMM DD, YYYY')
    }, undefined, 2));
  } else {
    res.send(JSON.stringify({
      "unix": moment.unix(time).format('X'),
      "natural": moment.unix(time).format('MMMM DD, YYYY')
    }, undefined, 2));
  }
  res.send();
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});