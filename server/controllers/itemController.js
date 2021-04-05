const { Item } = require("../db/models/item");
const { List } = require("../db/models/list");

exports.createNewItem = async (req, res) => {
  try {
    const existList = await List.findById(req.body.list);

    // handle the case if the list doesn't exist
    if (!existList) {
      return res.status(400).send('List doesn\'t exist!');
    }

    const list = await List.findByIdAndUpdate(
      req.body.list,
      { $addToSet: { tags: { $each: req.body.tags } } },
      { new: true }
    );

    const itemData = {
      ...req.body,
      list,
    };

    const newItem = await Item.create(itemData);
    return res.status(201).json(newItem);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ list: req.params.listId });
    return res.status(200).json(items);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
