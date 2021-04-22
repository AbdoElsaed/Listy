const mongoose = require("mongoose");
const { List } = require("./list");

const ItemSchema = mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  type: {
    type: String,
    enum: ["video", "article"],
    required: true,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
});

//update the items array within the attached list
ItemSchema.pre("save", async function (next) {
  await List.findOneAndUpdate({ _id: this.list }, { $push: { items: this } });
  next();
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = { Item };
