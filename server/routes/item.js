const express = require("express");
const router = express.Router();

const itemController = require('../controllers/itemController');

router.post('/item', itemController.create)
router.get('/:listId/item', itemController.getAllItems)

module.exports = router;
