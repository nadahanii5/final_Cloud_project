const mongoose = require("mongoose");

const DBConnection = () => {
  // connect to DB
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`DB connection successful: ${conn.connection.host}`);
  });
};

module.exports = DBConnection;
