const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports.saveTask = async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = await TaskModel.create({ task });
    console.log("Saved Successfully...");
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    await TaskModel.findByIdAndUpdate(id, { task });
    res.status(200).send("Updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await TaskModel.findByIdAndDelete(id);
    res.status(200).send("Deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
