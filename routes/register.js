var express = require('express');
var router = express.Router();

var userdb = require('../dbuser');

router.get('/', function(req, res, next) {
  userdb.findOne({ _id: req.session.uid}, (err,items) =>{
    if(err) throw err;
    res.render('register',{sess: req.session.uid, nick: items});
  });
});
  router.post('/',(req, res) =>{
      if(!req.body.rname || !req.body.remail || !req.body.rpassword || !req.body.rpasswordcheck || !req.body.rphone || !req.body.rpostal || !req.body.raddr || !req.body.raddress){
        res.send(`
          <script>
            alert('입력하지 않은 부분이 있습니다.');
            location.href="/register";
          </script>
          `);
    }else if(req.body.rpassword != req.body.rpasswordcheck){
        res.send(`
        <script>
        alert('비밀번호와 비밀번호 확인이 다릅니다.');
        location.href="/register";
        </script>
        `)
    }else{
      var data = { idname: req.body.rname, email: req.body.remail, password: req.body.rpassword, phone: req.body.rphone, postal: req.body.rpostal, addr: req.body.raddr, address:req.body.raddress};
      userdb.create(data, function(err, result){
        if(err) throw err;
        res.send(`
          <script>
            alert('정상적으로 회원가입되었습니다.');
            location.href="/login";
          </script>
          `);
      });
    }
    });

    module.exports = router;