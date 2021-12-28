const router = require("express").Router();
const {
  myPosts,
  create,
  update,
  deletePost,
  getPosts,
  postWithId,
  comment,
} = require("../controller/post");
const Auth = require("../middleware/Auth");

router.get("/", getPosts);
router.get("/:id", postWithId);
router.get("/myposts", Auth, getPosts);
router.post("/", Auth, create);
router.patch("/:id", Auth, update);
router.delete("/:id", Auth, deletePost);
router.post("/:id/reviews", Auth, comment);

module.exports = router;
