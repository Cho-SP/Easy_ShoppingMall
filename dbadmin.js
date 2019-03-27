const mongoose = require('mongoose');
const schema = mongoose.Schema;


//admin DB
const adminSchema = new schema({
    name: {type: String, required: true}, // 이름
    thumbnail: {type: String, required: true}, // 이미지
    price: {type: Number, required: true}, //가격
    date: {type: Date, default: Date.now} // 날짜
});

module.exports = mongoose.model('dbadmin', adminSchema);