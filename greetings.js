module.exports = function(models) {

  const nameList = [];

  const index = function(req, res, next) {

    models.Name.find({}, function(err, name) {
      if (err) {
        return next(err);
      }

      res.render('index', {
        name
      });
    });
  }
  const addName = function(req, res, next) {
    var message = "";
    var language = req.body.language

    var name = {
      name: req.body.name
    }

    if (language === 'English') {
      message = "Hello, " + name.name;
    } else if (language === 'French') {
      message = "Bounjuor, " + name.name;
    } else if (language === 'IsiZulu') {
      message = "Sawubona, " + name.name;
    }

    if (name.name && !name) {

      req.flash('error', 'name is already greeted!');

    }

    console.log(name !== "");
    if (name.name !== "") {
      models.Name.create({
        name: req.body.name
      }, function(err, results) {
        if (err) {
          return next(err);
        }
        req.flash('success', 'Name added');
      })
    }
    res.render('addName', {
      language: message
    })
  }
  return {
    addName,
    index
  }
}
