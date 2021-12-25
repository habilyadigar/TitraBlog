const router = require("express").Router();
const {
  myPosts,
  create,
  update,
  deletePost,
  getPosts,
  postWithId,
} = require("../controller/post");
const Auth = require("../middleware/Auth");

router.get("/", getPosts);
router.get("/:id", postWithId);
router.get("/myposts", Auth, getPosts);
router.post("/", Auth, create);
router.put("/:id", Auth, update);
router.delete("/:id", Auth, deletePost);

module.exports = router;
