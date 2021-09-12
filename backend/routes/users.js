var express = require("express");
var router = express.Router();
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const {
  register,
  login,
  update,
  deleteUser,
  getUser,
  follow,
  unfollow,
} = require("../controller/UserController");

/* GET users listing. */
// router.post("/register", function (req, res, next) {
//   console.log(req.body);
//   res.send("User");
// });
router.post("/register", register);
router.post("/login", login);
router.put("/:id", isAuthenticatedUser, update);
router.delete("/:id", isAuthenticatedUser, deleteUser);
router.get("/:id", getUser);
router.put("/:id/follow", isAuthenticatedUser, follow);
router.put("/:id/unfollow", isAuthenticatedUser, unfollow);

module.exports = router;
