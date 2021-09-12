const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(`mongodb://localhost:27017/social_network`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) => {
      console.log(
        `DB connected with host: ${con.connection.host}`,
        process.env.DB_LOCAL_URI
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
