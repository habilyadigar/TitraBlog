const router = require("express").Router();
const { myPosts, create, update, deletePost } = require("../controller/post");
const Auth = require("../middleware/Auth");

router.get("/", myPosts);
router.post("/", Auth, create);
router.put("/:id", Auth, update);
router.delete("/:id", Auth, deletePost);

module.exports = router;
