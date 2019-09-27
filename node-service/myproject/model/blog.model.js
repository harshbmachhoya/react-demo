const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: String,
    body: String,
    file: String
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Blog', BlogSchema);