const mongoose = require('mongoose');

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks',
=======
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/googlebooks',
>>>>>>> 77f4a4e053d7e20edf8cbe9cd8c36b17fd743eae
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
<<<<<<< HEAD
  useFindAndModify: false,
=======
  useFindAndModify: true,
>>>>>>> 77f4a4e053d7e20edf8cbe9cd8c36b17fd743eae
});

module.exports = mongoose.connection;
