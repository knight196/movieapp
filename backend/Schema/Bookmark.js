const mongoose = require('mongoose')

const Bookmarkmovie = new mongoose.Schema(
    {
        cartItems:Array,
        email: String,
        addedbookmark:{type:Boolean,default:true},
    },
    {timestamps: true}
)


module.exports = mongoose.model('Bookmark', Bookmarkmovie)
