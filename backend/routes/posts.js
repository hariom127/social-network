var express = require("express");
var router = express.Router();
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const {
  store,
  update,
  deletePost,
  likePost,
  getPost,
  timeline,
} = require("../controller/PostController");

// save a new post
router.post("/store", isAuthenticatedUser, store);
// edit post
router.put("/:id", isAuthenticatedUser, update);
// delete post
router.delete("/:id", isAuthenticatedUser, deletePost);
// like -dislike
router.put("/:id/like", isAuthenticatedUser, likePost);
// get a post
router.get("/:id", isAuthenticatedUser, getPost);
// get timeline post
router.get("/timeline/all", isAuthenticatedUser, timeline);

module.exports = router;
