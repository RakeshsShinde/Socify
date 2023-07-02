const mongoose = require('mongoose');

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })

      console.log('connected !!');
   } catch (error) {
      console.log(error);
   }
}


module.exports = connectDB;