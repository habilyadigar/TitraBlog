const router = require("express").Router();
const { register, login, getUser, updateUser } = require("../controller/user");
const Auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/:id", Auth, getUser);
router.patch("/profile", Auth, updateUser);

module.exports = router;
