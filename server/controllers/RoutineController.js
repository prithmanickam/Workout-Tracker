const RoutineModel = require("../models/RoutineModel");

module.exports.saveRoutines = async (req, res) => {
    console.log('hello')
  try {
    const { routines } = req.body;
    console.log(routines);
    const newRoutines = await RoutineModel.create({ routines })
    console.log("Saved Routine Successfully...");
    res.status(200).json(newRoutines);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
