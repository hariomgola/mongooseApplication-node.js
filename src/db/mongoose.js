// importing library
const chalk = require("chalk");
const mongoose = require("mongoose");

// connecting to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(chalk.green(`  -> connecting to database complete`));
  })
  .catch(() => {
    console.log(chalk.red(`  -> connection to database is unsuccessfull`));
  });

// defining a model
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// creating a instance
const User_Hari = new User({
  name: "Hari",
  age: 20,
});

// save to database
User_Hari.save()
  .then((result) => {
    console.log(chalk.green(`  -> ${result}`));
  })
  .catch((err) => {
    console.log(chalk.red(`  -> ${err}`));
  });
