const express = require("express");
const router = express.Router();

const { authenticate } = require('../middleware/authenticate');

const listController = require('../controllers/listController');

router.post('/', authenticate, listController.createNewList);
router.get('/', authenticate, listController.getAllLists);
router.get('/ext', authenticate, listController.getListsForExt);
router.get('/public', listController.getPublicLists);
router.get('/:username', listController.getListsForUser);
router.put('/:id', authenticate, listController.editList);
router.delete('/:id', authenticate, listController.deleteList);

module.exports = router;
