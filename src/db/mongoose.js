// importing library
const chalk = require("chalk");
const mongoose = require("mongoose");
const validator = require("validator");

// connecting to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
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
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(`  -> Please provide a vails email`);
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error(`  -> Please provide a positive age`);
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error(`  -> Please don't use "password" as password.`);
      }
    },
  },
});

// creating a instance
const User_Hari = new User({
  name: "Hari",
  email: "Hari@gmail.Com",
  password: "javaScript",
});

// save to database
User_Hari.save()
  .then((result) => {
    console.log(chalk.green(`  -> ${result}`));
  })
  .catch((err) => {
    console.log(chalk.red(`  -> ${err}`));
  });
