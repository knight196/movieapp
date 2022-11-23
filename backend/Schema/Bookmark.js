const mongoose = require('mongoose')

const Bookmarkmovie = new mongoose.Schema(
    {
        cartItems:Array,
        email: String,
    },
    {timestamps: true}
)


module.exports = mongoose.model('Bookmark', Bookmarkmovie)
