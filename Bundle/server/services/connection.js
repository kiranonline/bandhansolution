const mongoose = require("mongoose");
const Tools = require("./tools");

mongoose.Promise = global.Promise;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, options).then(()=>{
  console.log("connected to database");
  //Tools.createAdminUser("Kiran Kumar Das","kirankumardas18091997@gmail.com","passwordapc");
}).catch((err)=>{
  console.log("Error connecting to database",err);
})


