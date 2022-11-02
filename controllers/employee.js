const { ObjectId } = require("mongodb");
const catchAsync = require("../utils/catchAsync");
const Employee = require("./../models/employeeModel");

exports.createEmployee = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const employee = await Employee.create({ name });

  res.status(201).json({
    status: "success",
    data: employee,
  });
});

exports.listEmployees = catchAsync(async (req, res, next) => {
  const employee = await Employee.find();

  res.status(200).json({
    status: "success",
    data: employee,
  });
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  const { employeeId } = req.params;
  const { name } = req.body;

  const employee = await Employee.findOneAndUpdate(
    { _id: ObjectId(employeeId) },
    { name }
  );
  if (!employee) {
    const error = new Error("Employee Not Found");
    error.statusCode = 400;
    throw error;
  }
  res.status(200).json({
    status: "success",
    employee: { ...employee._doc, name },
  });
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  const { employeeId } = req.params;

  const employee = await Employee.deleteOne({ _id: ObjectId(employeeId) });
  if (!employee) {
    const error = new Error("Employee Not Found");
    error.statusCode = 400;
    throw error;
  }
  res.status(204).json({
    status: "success",
    employee,
  });
});
