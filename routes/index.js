var express = require('express');
var router = express.Router();

var admindb = require('../dbadmin');
var userdb = require('../dbuser');
var comdb = require('../dbcomment');

/* GET home page. */
router.get('/', function(req, res, next) {
  userdb.findOne({ _id: req.session.uid}, (err, items) =>{
    if(err) throw err;
    res.render('index', {sess: req.session.uid, nick: items});
  })
});


router.get('/comment', function(req, res, next) {
  comdb.find({}, (err, result) =>{
    userdb.findOne({ _id: req.session.uid}, (err, items) => {
      if(err) throw err;
    if(err) throw err;
  res.render('comment', { shdb: result, sess: req.session.uid, nick:items });
});
});
});
router.post('/comment',(req, res) =>{
  if(!req.body.name || !req.body.password || !req.body.content){
    res.send(`
      <script>
        alert('입력하지 않은 부분이 있습니다.');
        location.href="/comment";
      </script>
      `);
}else{
  var data = { name: req.body.name, password: req.body.password, content: req.body.content};
  comdb.create(data, function(err, result){
    if(err) throw err;
    res.send(`
      <script>
        alert('정상적으로 등록되었습니다.');
        location.href="/comment";
      </script>
      `);
  });
}
});

router.post('/sessioncomment',(req, res) =>{
  if(!req.body.session_content){
    res.send(`
      <script>
        alert('내용을 입력하세요.');
        location.href="/comment";
      </script>
      `);
  }else{
    userdb.findOne({_id: req.session.uid}, function(err, items){
      var data = { name: items.idname, password: items.password, content: req.body.session_content};
      comdb.create(data, function(err, result){
        if(err) throw err;
        res.send(`
        <script>
          alert('정상적으로 등록되었습니다.');
          location.href="/comment";
        </script>
        `);
      })
    })
  }
});
router.post('/del/:id', function(req, res) {
  comdb.findOne({_id : req.params.id }, function(err, items) {
      if( items.password == req.body.delpass) {
          comdb.remove({_id : req.params.id }, function(err) {
              if(err) {
                  throw err;
              } else {
                  res.send(`<script>alert('정상적으로 삭제되었습니다.');location.href='/comment'</script>`)
              }
          });
      } else {
          res.send(`<script>alert('비밀번호가 틀렸습니다.');location.href='/comment'</script>`)
      }
  });
});



router.get('/login', function(req, res, next) {
  userdb.findOne({ _id: req.session.uid}, (err,items)=>{
    if(err) throw err;
    res.render('login', {sess: req.session.uid, nick: items});
})
});
router.post('/login', function(req, res){
  userdb.findOne({ idname: req.body.logname}, function(err, items){
    if(items.idname === req.body.logname && items.password === req.body.logpass){
      req.session.uid = items.id;
      console.log(req.session.uid);
      res.send(`
      <script>
      alert('로그인에 성공했습니다!');
      location.href="/";
      </script>
      `)
    }else{
      res.send(`
      <script>
      alert('아이디나 비밀번호가 잘못되었습니다!!');
      location.href="/";
      </script>
      `)
    }
  })
})

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
})



router.get('/developer', function(req, res, next) {
  userdb.findOne({ _id: req.session.uid}, (err,items)=>{
    if(err) throw err;
    res.render('developer', {sess: req.session.uid, nick: items});
  })
});
router.post('/developer',(req, res) =>{
    if(req.body.devpass === "hansei1234"){
        res.redirect('/admin');
  }else{
      res.send(`
        <script>
          alert('Nope');
          location.href="/developer";
        </script>
        `);
    };
});



router.get('/shop', function(req, res, next) {
  admindb.find({}, (err, result) =>{
    userdb.find({ _id: req.session.uid}, (err,items) => {
    if(err) throw err;
  res.render('shop', { adb: result, sess: req.session.uid, nick: items });
});
});
});


router.get('/shop/1', function(req, res, next) {
  userdb.findOne({ _id: req.session.uid}, (err, items) =>{
    if(err) throw err;
    res.render('1', {sess: req.session.uid, nick: items});
  })
});
router.get('/shop/2', function(req, res, next) {
  userdb.findOne({ _id: req.session.uid}, (err, items) =>{
    if(err) throw err;
    res.render('2', {sess: req.session.uid, nick: items});
  })
});
router.get('/shop/3', function(req, res, next) {
  userdb.findOne({ _id: req.session.uid}, (err, items) =>{
    if(err) throw err;
    res.render('3', {sess: req.session.uid, nick: items});
  })
});
router.get('/shop/4', function(req, res, next) {
  userdb.findOne({ _id: req.session.uid}, (err, items) =>{
    if(err) throw err;
    res.render('4', {sess: req.session.uid, nick: items});
  })
});
router.get('/shop/5', function(req, res, next) {
  userdb.findOne({ _id: req.session.uid}, (err, items) =>{
    if(err) throw err;
    res.render('5', {sess: req.session.uid, nick: items});
  })
});
router.get('/shop/6', function(req, res, next) {
  userdb.findOne({ _id: req.session.uid}, (err, items) =>{
    if(err) throw err;
    res.render('6', {sess: req.session.uid, nick: items});
  })
});

module.exports = router;
