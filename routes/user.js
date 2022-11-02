const router = require("express").Router();
const userController = require("../controllers/user");
const employeeController = require("./../controllers/employee");

router.route("/signIn").post(userController.signIn);

module.exports = router;
