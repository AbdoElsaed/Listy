const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authenticate");
const { publicUpload } = require("../middleware/upload");

const userController = require("../controllers/userController");

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.put("/", authenticate, userController.edit);
router.get("/avatar", authenticate, userController.getAvatar);
router.post("/avatar", [authenticate, publicUpload.single("avatar")], userController.addAvatar);
router.delete("/avatar", authenticate, userController.deleteAvatar);
router.post("/saveList", authenticate, userController.saveList);
router.post("/unSaveList", authenticate, userController.unSaveList);
router.get("/savedLists", authenticate, userController.getSavedLists);
router.get("/:id/followers", authenticate, userController.getFollowers);
router.get("/:id/following", authenticate, userController.getFollowing);
router.get("/:handleName", authenticate, userController.getUserByHandleName);
router.post("/follow", authenticate, userController.followUser);
router.post("/unfollow", authenticate, userController.unFollowUser);

module.exports = router;
