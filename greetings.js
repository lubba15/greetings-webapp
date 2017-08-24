module.exports = function(models) {

  const greeted = function(req, res, next) {

    models.Name.find({}, function(err, name) {
      if (err) {
        return next(err);
      }

      res.render('greeted', {
        name: name
      });
    });
  }

  const addName = function(req, res, next) {
    var language = req.body.language
    var message = "";
    var data = {
      name: req.body.name
    }

    if (data.name !== undefined) {
      models.Name.findOne({
        name: req.body.name
      }, function(err, greetedName) {
        if (err) {
          done(err);
        }

        console.log(greetedName);

        if (greetedName !== null) {
          greetedName.greetCounter = greetedName.greetCounter + 1
          greetedName.save(function(err, name) {
            if (err) {
              return done(err);
            }
          })


          models.Name.find({}, function(err, allNamesGreeted) {
            if (err) {
              return done(err);
            }

            if (language === 'English') {
              message = "Hello, " + greetedName.name;
            } else if (language === 'French') {
              message = "Bounjuor, " + greetedName.name;
            } else if (language === 'IsiZulu') {
              message = "Sawubona, " + greetedName.name;
            }
            var msg = allNamesGreeted.length + " names has been greeted for this session.";

            var allNames = {
              greetings: message,
              msg: msg
            }
            console.log(allNames);
            res.render('addName', allNames)


          });
        }

        if (greetedName === null) {
          models.Name.create({
            name: req.body.name,
            greetCounter: 1
          }, function(err, name) {
            if (err)
              return done(err);

            models.Name.findOne({
              name: req.body.name
            }, function(err, result) {
              if (err) {
                return done()
              }


              models.Name.find({}, function(err, allNames) {
                if (err) {
                  return done()
                }

                if (language === 'English') {
                  message = "Hello, " + result.name;
                } else if (language === 'French') {
                  message = "Bounjuor, " + result.name;
                } else if (language === 'IsiZulu') {
                  message = "Sawubona, " + result.name;
                }
                var otpt = allNames.length + " have been greeted for this session";


                var NamesGreeted = {
                  greetings: message,
                  msg: otpt
                }

                res.render('addName', NamesGreeted);
              })

            })
          })
        }

      })
    } else {
      res.render('addName')
    }
  }

  const counter = function(req, res, done) {

    var name = req.params.name;

    models.Name.findOne({
      name: req.params.name
    }, function(err, result) {

      if (err) {
        done(err)
      }
      var output = result.name + " have been greeted " + result.greetCounter + ' time(s).';
      console.log(result);
      var counts = {
        counting: output
      }
      res.render('counter', counts);
    })
  };

  const clear = function(req, res, done) {
    var name = req.params.name;

    models.Name.remove({}, function(err) {
      if (err) {
        done(err)
      }
   res.render('greeted');
    })

  }

  return {
    addName,
    greeted,
    counter,
    clear
  }
}
