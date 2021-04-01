var express = require('express');
var Client = require('./modules/employee');
var router = express.Router();
// var contact = conmodel.find({});



router.get('/contact', (req,res) => {
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("form");
        dbo.collection("contact_forms").find({}, { projection: { _id: 0, __v:0 } }).toArray(function(err, result) {
          if (err) throw err;
          else{
            res.render('views/index.ejs', {clients: result});
            db.close();
          }
        });
    });
});

module.exports = router;