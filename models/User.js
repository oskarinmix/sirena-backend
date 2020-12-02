var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({

    name: { type: String, required: [true, 'The name is required'] },
    email: { type: String, unique: true, required: [true, 'The email is Required'] },
    password: { type: String, required: [true, 'The password is required'] },
    image: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);