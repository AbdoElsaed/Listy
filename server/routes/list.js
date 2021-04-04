const express = require("express");
const router = express.Router();

const listController = require('../controllers/listController');

router.post('/:id/list', listController.create);
router.get('/:id/list', listController.getAllLists);
router.get('/lists/public', listController.getPublicLists);

module.exports = router;
