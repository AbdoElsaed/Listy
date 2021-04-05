const express = require("express");
const router = express.Router();

const { authenticate } = require('../middleware/authenticate');

const itemController = require('../controllers/itemController');

router.post('/', authenticate, itemController.createNewItem)
router.get('/:listId', authenticate, itemController.getAllItems)

module.exports = router;
