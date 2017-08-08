module.exports = function() {

  const nameList = [];
  // body..
  const index = function(req, res) {
    res.render('index', {
      name: nameList
    });
  };

  const add = function(req, res) {
    res.render('addName');
  };

  const addName = function(req, res) {
    var name = req.body.name;
    var language = req.body.language;
    var message = "";

    if (language === 'English') {
      message = "Hello, " + name;
    } else if (language === 'French') {
      message = "Bounjuor, " + name;
    } else if (language === 'IsiZulu') {
      message = "Sawubona, " + name;
    }

    var names = nameList.find(function(nameAdded) {
      return nameAdded === name;
    })

    if (name && !names) {
      nameList.push(name);
    } else {
      req.flash('error', 'name is already greeted!')
    }
    console.log(language);
    console.log(message);
    res.render('addName', {
      language: message
    })
  }
  return {
    // add,
    addName,
    index
  }
};
