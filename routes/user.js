const router = require("express").Router();
const userController = require("../controllers/user");

router.route("/signIn").post(userController.signIn);

module.exports = router;
