var express = require('express');
var app = express();
var greet = [];
// create a route
app.get('/greetings/:name', function(req, res) {
  var name = req.params.name;
  greet.push(name)
  res.send("Hello, " + name);
});

app.get('/greeted', function(req, res) {
  res.send(greet);
});
app.get('/counter/:name', function(req, res) {
  var name = req.params.name;

  function CounterNum(input) {
    return input == name;

  }
  var CounterNum = greet.filter(CounterNum).length;
  res.send("Hello, " + name + ' has been greeted ' + CounterNum + ' times(s)')
});

var port = 3000;
//start the server
var server = app.listen(port, function() {

  var host = server.address().address
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
