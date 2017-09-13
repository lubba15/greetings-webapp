const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const GreetRoutes = require("./greetings");
const Models = require('./models');

const models = Models(process.env.MONGO_DB_URL || "mongodb://localhost/addName")
const greetRoutes = GreetRoutes(models);


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

app.get("/addName", greetRoutes.addName);
app.post("/addName", greetRoutes.addName);

// app.get("/addName", greetRoutes.showIndex);
app.get("/greeted", greetRoutes.greeted);
app.post("/greeted", greetRoutes.greeted);

app.get("/counter/:name", greetRoutes.counter);

 app.get("/clear", greetRoutes.clear);
 app.post("/clear", greetRoutes.clear);
// app.post("/counter/:name", greetRoutes.counter);

const port = process.env.PORT || 3070;

app.listen(port, function() {
  console.log('Web app started on port : ' + port);

});
