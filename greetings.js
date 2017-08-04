module.exports = function(){

  const nameList = [];
  // body...
  const index = function(req, res){
    res.render('index.handlebars',{greetings : nameList});
  };

  const add = function(req, res){
     res.render('addName');
  };

  const addName = function(req, res){
    var name = req.body.name;
    var language = req.body.language;

    if (language == 'English') {
      var message = "Hello, " + name;
    }
    else if (language == 'French') {
      var message = "Bounjuor, " + name;
    }
    else if (language == 'IsiZulu') {
      var message = "Sawubona, " + name;
    }

else {
  req.flash('error', 'name is already greeted!')
}

    var data = {
      message: message
    }
    console.log(data);
    res.render('addName', data)
  }
  return{
    add,
    addName
  }
};
