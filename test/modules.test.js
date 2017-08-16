const assert = require('assert');
const Models = require('../models');


describe('modules should be able to', function() {

  it('store names to mongoDB', function(done) {

    var models = Models("mongodb://localhost/addName")


    var data = {
      name: 'Name'
    }
    models.Name.findOne({
      name: 'Name'
    }, function(err, result) {
      if (err) {
        return done(err)
      }

      if (!result) {
        models.Name
          .create({
            name: 'The names test'
          }, function(err) {
            done(err);
          })
      };

    })

  })
})
