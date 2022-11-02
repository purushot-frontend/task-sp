const router = require("express").Router();
const userController = require("../controllers/user");
const employeeController = require("./../controllers/employee");

//employee protected routes for CRUD task
router.use(userController.protect);
router
  .route("/")
  .post(employeeController.createEmployee)
  .get(employeeController.listEmployees);

router
  .route("/:employeeId")
  .delete(employeeController.deleteEmployee)
  .patch(employeeController.updateEmployee);

module.exports = router;
