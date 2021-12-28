const router = require("express").Router();
const {
  register,
  login,
  getUser,
  updateUser,
  getUserPosts,
} = require("../controller/user");
const Auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/:id", Auth, getUser);
router.get("/", Auth, getUserPosts);
router.patch("/", Auth, updateUser);

module.exports = router;
