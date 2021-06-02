const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authenticate");

const itemController = require("../controllers/itemController");

router.get("/yt", itemController.downloadVideo);
router.get("/:listId", authenticate, itemController.getAllItems);
router.post("/", authenticate, itemController.createNewItem);
router.delete("/:id", authenticate, itemController.deleteItem);

module.exports = router;
