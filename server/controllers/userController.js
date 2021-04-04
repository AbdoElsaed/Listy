const bcrypt = require("bcryptjs");
const _ = require("lodash/lodash");

const { User } = require("../db/models/user");

const salt = bcrypt.genSaltSync(10);

exports.register = async (req, res) => {
  try {
    const userIndex = (await User.find()).length + 1;

    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      password: bcrypt.hashSync(req.body.password, salt),
      uniqueUrl: `${req.body.firstName}.${req.body.lastName}.${userIndex}`,
    };

    const newUser = await User.create(userData);

    const token = newUser.generateAuthToken();
    return res.header("Authorization", token).json({ newUser, token });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = user.generateAuthToken();
      return res.header("Authorization", token).json({ user, token });
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
