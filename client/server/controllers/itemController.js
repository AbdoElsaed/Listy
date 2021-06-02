const axios = require("axios").default;
const cheerio = require("cheerio");
const ytdl = require('ytdl-core');

const { Item } = require("../db/models/item");
const { List } = require("../db/models/list");

exports.createNewItem = async (req, res) => {
  try {
    const existList = await List.findOne({
      title: req.body.list,
      creator: req.user._id,
    });

    // create a new list if the list doesn't exist
    if (!existList) {
      const listData = {
        title: req.body.list,
        creator: req.user._id,
        uniqueUrl: `${req.body.list}.${new Date().getTime().toString(36)}`,
      };
      await List.create(listData);
    }

    // handle the sent tags
    // const tags = req.body.tags && req.body.tags.length > 0 && (typeof req.body.tags) !== 'string' ? req.body.tags : (typeof req.body.tags === 'string') ? [req.body.tags] : [];
    const tags =
      req.body.tags && req.body.tags.includes(",")
        ? req.body.tags.split(",")
        : [req.body.tags];

    console.log("tags", tags);

    const list = await List.findOneAndUpdate(
      { title: req.body.list, creator: req.user._id },
      { $addToSet: { tags: { $each: tags } } },
      { new: true }
    );

    // get title of the link page
    const body = await axios.get(req.body.link);
    const $ = cheerio.load(body.data);
    const title = $("title").text();

    const itemData = {
      ...req.body,
      list,
      title: title ? title : "",
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

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndRemove(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.downloadVideo = async (req, res) => {
  try {

    const url = req.query.url;
    res.header("Content-Disposition", 'attachment; filename="video.mp4"');
    return await ytdl(url, {
      format: "mp4",
    }).pipe(res);
    
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}