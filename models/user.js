var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name of user is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name of user is required']
    },
    email: {
        type: String,
        required: [true, 'Email of user is required']
    },
    bio: {
        type: String,
        required: false
    }
  });
var User = mongoose.model('User', userSchema);

module.exports = User;
  