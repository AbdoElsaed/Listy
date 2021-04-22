const { List } = require("../db/models/list");
const { User } = require("../db/models/user");

exports.createNewList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const tags = req.body.tags.split(',');
    const listData = {
      title: req.body.title,
      description: req.body.description,
      items: req.body.items,
      public: req.body.public,
      uniqueUrl: `${req.body.title}.${new Date().getTime().toString(36)}`,
      tags,
      creator: user,
    };

    const newList = await List.create(listData);
    return res.status(201).json(newList);

  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.find({ creator: req.user._id }).populate('items');
    res.status(200).json(lists);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.getPublicLists = async (req, res) => {
  try {
    const lists = await List.find({ public: true }).populate('items');
    res.status(200).json(lists);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
