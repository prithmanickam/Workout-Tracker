const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    title: {
      type: String,
    
    },
    area: {
      type: String,
    
    },
    setRepDuration: {
      type: String,
    
    },
    tips: {
      type: String,
    
    },
    image: {
      type: String,
    
    },
  });

const routineSchema = new mongoose.Schema({
  title: {
    type: String,
  
  },
  Summary: {
    type: String,
  
  },
  numWorkouts: {
    type: String,
  
  },
  workouts: {
    type: [workoutSchema],
  
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "UserInfo", // Reference to the user who created the routine
  },
});

module.exports = mongoose.model("createdRoutine", routineSchema);
