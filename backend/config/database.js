const mongoose = require("mongoose");


const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

module.exports = connectDatabase;