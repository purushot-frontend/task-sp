const router = require("express").Router();
const userController = require("../controllers/user");
const employeeController = require("./../controllers/employee");

//employee route for CRUD task
router
  .route("/")
  .post(userController.protect, employeeController.createEmployee)
  .get(userController.protect, employeeController.listEmployees);

router
  .route("/:employeeId")
  .delete(userController.protect, employeeController.deleteEmployee)
  .patch(userController.protect, employeeController.updateEmployee);

module.exports = router;
