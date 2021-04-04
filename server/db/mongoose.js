//  MongoDB connection 
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Apdo:3146411@cluster0.69pvb.mongodb.net/listyDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
	console.log('Connected to MongoDB')
})

module.exports = { mongoose };
