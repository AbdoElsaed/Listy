const { Item } = require("../db/models/item");
const { List } = require("../db/models/list");

exports.create = async (req, res) => {
  try {
    const list = await List.findOne({ title: req.body.list });

    //handle the case if the list doesn't exist
    if(!list){
        const listsNum = (await List.find()).length;
        const listData = {
            title: req.body.list,
            uniqueUrl: `${req.body.list.replace(' ', '-')}.${listsNum+1}`
        }
        const newList = new List(listData);
        const list = await newList.save();
    }

    await List.findOneAndUpdate({ title: req.body.list }, { $addToSet: { tags: req.body.tags } });

    const itemData = {
      ...req.body,
      list
    };

    const newItem = new Item(itemData);
    const item = await newItem.save();

    if (item) {
      return res.status(201).json({ item, msg: "item created" });
    } else {
      return res.status(400).json({ msg: "error while creating new item" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ list: req.params.listId });
    if (items) {
      return res.status(200).json({ items, msg: "get items successfully" });
    } else {
      return res.status(400).json({ msg: "error getting items" });
    }
  } catch (err) {
    console.log(err);
  }
};
