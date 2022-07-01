const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost:27017/to-do-db')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.error('Connection failed…', err))
}
