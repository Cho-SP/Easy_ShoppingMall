var express = require('express');
var router = express.Router();
var userdb = require('../dbuser');
var admindb = require('../dbadmin');

/* GET home page. */

  router.get('/', function(req, res, next) {
    userdb.find({}, (err, result) =>{
      if(err) throw err;
      res.render('admin', { use: result, sess: req.session.uid});
    });
  });
  router.post('/',(req, res) =>{
    if(!req.body.aname || !req.body.aprice || !req.body.aimage){
      res.send(`
        <script>
          alert('입력하지 않은 부분이 있습니다.');
          location.href="/admin";
        </script>
        `);
  }else{
    var data = { name: req.body.aname, price: req.body.aprice, thumbnail: req.body.aimage};
    admindb.create(data, function(err, result){
      if(err) throw err;
      res.send(`
        <script>
          alert('정상적으로 등록되었습니다.');
          location.href="/admin";
        </script>
        `);
    });
  }
  });
module.exports = router;
