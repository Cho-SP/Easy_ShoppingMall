const mongoose = require('mongoose');
const schema = mongoose.Schema;


//login, register DB
const userSchema = new schema({
    idname: {type: String, required: [true, '이름을 입력하세요']}, // 이름
    email: {type: String, required: [true, '이메일을 입력하세요']}, //이메일
    password: {type: String, required: [true, '비밀번호를 입력하세요']}, // 비밀번호
    date: {type: Date, default: Date.now}, // 날짜
    phone: {type: String, required:[true, '전화번호를 입력하세요']},
    postal: {type: Number, required:true},  //우편번호
    addr: {type: String, required:true},  //주소
    address: {type:String, required:true}
});

module.exports = mongoose.model('dbuser', userSchema);