const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const ImgSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    bucket: {
      type: String,
    },
    key: {
      type: String,
    },
    region: {
      type: String,
      default: process.env.AWS_REGION,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

ImgSchema.virtual("location").get(function () {
  return encodeURI(
    `https://${this.bucket}.s3.${this.region}.amazonaws.com/${this.key}`
  );
});

const UserSchema = mongoose.Schema(
  {
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
    avatar: {
      type: ImgSchema,
      required: false,
    },
    coverImage: {
      type: ImgSchema,
      required: false,
    },
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    savedLists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    gender: {
      type: String,
      enum: [
        "male",
        "female",
        "non-binary",
        "transgender",
        "prefer not to disclose",
      ],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
  { timestamps: true }
);

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

const returnedValues = [
  "_id",
  "name",
  "firstName",
  "lastName",
  "email",
  "uniqueUrl",
  "avatar",
  "coverImage",
  "lists",
  "savedLists",
  "gender",
];

const User = mongoose.model("User", UserSchema);
module.exports = { User, returnedValues };
