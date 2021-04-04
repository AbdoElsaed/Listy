const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: "not a valid email!",
    },
  },
  password: {
    type: String,
  },
  uniqueUrl: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  coverImage: {
    type: String,
    required: false,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

UserSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.generateAuthToken = function () {
  const User = this;
  const access = "UserEmail";
  const token = jwt
    .sign({ email: User.email, access }, process.env.JWT_SECRET)
    .toString();
  return token;
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return Promise.reject();
  }
  if (decoded.access === "UserEmail") {
    return User.findOne({
      email: decoded.email,
    });
  } else {
    return Promise.reject();
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
