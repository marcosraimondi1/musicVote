const mongoose = require("mongoose");

function mongo_config() {
  // Mongo Connection
  const ip = process.env.IP;
  const mongoDatabase = process.env.MONGO_DATABASE;
  const mongoUserName = process.env.MONGO_USER;
  const mongoPassword = process.env.MONGO_PASS;
  const mongoPort = process.env.MONGO_PORT;

  // for mongodb Atlas: mongodb+srv://devuser:<password>@cluster0.xgchr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  // const uri =
  //   "mongodb+srv://" +
  //   mongoUserName +
  //   ":" +
  //   mongoPassword +
  //   "@cluster0.xgchr.mongodb.net/turnero_db?retryWrites=true&w=majority";

  const uri = `mongodb://${mongoUserName}:${mongoPassword}@${ip}:${mongoPort}/${mongoDatabase}?retryWrites=true&w=majority`;

  const options = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    authSource: "admin"
  };

  mongoose.connect(uri, options).then(
    () => {
      console.log("\n");
      console.log("***************************");
      console.log("~ Mongo Succesfully Connected!");
      console.log("***************************");
      console.log("\n");
    },
    (err) => {
      console.log("\n");
      console.log("***************************");
      console.log("~ Mongo Connection Failed ");
      console.log("***************************");
      console.log("\n");
      console.log(err);
    }
  );
}

module.exports = mongo_config;
