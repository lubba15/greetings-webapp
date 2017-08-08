const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const GreetRoutes = require("./greetings");
const greetRoutes = GreetRoutes();
const app = express();

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  }
}));
app.use(flash());

app.get('/', function(req, res) {
  res.redirect("/addName");
});

app.get("/addName" , greetRoutes.addName);
app.post("/addName" , greetRoutes.addName);

app.get("/index" , greetRoutes.index);
app.post("/index" , greetRoutes.index);

const port = 3007

app.listen(port, function() {
  console.log('Web app started on port : ' + port);

});


// var greet = [];
//
// app.get('/greetings/:name', function(req, res) {
//   var name = req.params.name
//   res.send("Hello, " + name);
//   greet.push(name)
// });
//
// app.get('/greeted', function(req, res) {
//   res.send(greet);
// });
// app.get('/counter/:name', function(req, res) {
//   var name = req.params.name;
//
//   function CounterNum(input) {
//     return input === name;
//
//   }
//   var CounterNum = greet.filter(CounterNum).length;
//   res.send("Hello, " + name + ' has been greeted ' + CounterNum + ' times(s)')
// });
