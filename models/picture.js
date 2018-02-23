var mongoose = require('mongoose');

var pictureSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of picture is required']
    },
    type: {
        type: String,
        required: [true, 'Type of picture is required']
    },
    url: {
        type: String,
        required: [true, 'Url of picture is required']
    },
    userId: {
        type: String,
        required: [true, 'User id is required']
    },    
    date: {
        type: Date,
        required: false
    }
  });
var Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
  