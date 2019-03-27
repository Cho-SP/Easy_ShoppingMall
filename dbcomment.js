const mongoose = require('mongoose');
const schema = mongoose.Schema;


//comment DB
const commentSchema = new schema({
    name: {type: String,required:true}, // 이름
    password: {type: String,required:true}, // 비밀번호
    date: {type: Date, default: Date.now}, // 날짜
    content: {type: String, required:true} // 댓글
});

module.exports = mongoose.model('dbcomment', commentSchema);