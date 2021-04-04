const mongoose = require('mongoose');
const { User } = require('./user');

const ListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    public: {
        type: Boolean,
        required: true,
        default: false
    },
    uniqueUrl: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    maker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }

})

//update the user's lists array with the new list
// ListSchema.pre('save', async function(next){
//     await User.findOneAndUpdate({ _id: this.maker._id }, { $push: { lists: this }});
//     next()
// })

const List = mongoose.model('List', ListSchema);
module.exports = { List };