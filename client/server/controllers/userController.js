const bcrypt = require("bcryptjs");
const _ = require("lodash/lodash");

const { User, returnedValues } = require("../db/models/user");

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
      return res
        .header("Authorization", token)
        .json({ user: _.pick(user, returnedValues), token });
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.edit = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: _.pick(req.body, ["firstName", "lastName", "email", "gender"]),
      },
      { new: true }
    );

    return res.json(_.pick(user, returnedValues));
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.getAvatar = async (req, res) => {
  try {
    const avatar = await User.findById(req.user._id).select("avatar");
    return res.json({ avatar });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.addAvatar = async (req, res) => {
  try {
    if (!req.file) return res.send("no file provided!");

    const data = {
      title: req.file.originalname,
      bucket: req.file.bucket,
      key: req.file.key,
      region: req.file.region,
    };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { avatar: data } },
      { new: true }
    );
    const { avatar } = user;
    return res.json({ avatar });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.saveList = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { savedLists: req.body.listId },
      },
      { new: true }
    );

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.unSaveList = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { savedLists: req.body.listId },
      },
      { new: true }
    );

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.getSavedLists = async (req, res) => {
  try {
    const { savedLists } = await User.findById(req.user._id).populate({
      path: "savedLists",
      populate: { path: "items" },
    });
    return res.status(200).json({ savedLists });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.deleteAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { avatar: null } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
