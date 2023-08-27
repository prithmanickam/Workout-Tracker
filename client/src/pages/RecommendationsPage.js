import React from "react";
import { Container, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const initalRoutineHistoryData = [
  {
    title: "Efficient Full Body Workout",
    workouts: [
      { title: "Push-ups", duration: "3 sets x 15 reps", area: "arms" },
      { title: "squats", duration: "4 sets x 15 reps", area: "legs" },
      { title: "Jumping Jacks", duration: "4 sets x 20 reps", area: "Cardio" },
    ],
    time: 45,
    date: "2023-08-25",
  },
  {
    title: "My Legs Workout",
    workouts: [
      { title: "Push-ups", duration: "3 sets x 15 reps", area: "legs" },
      { title: "calves", duration: "3 sets x till failure", area: "legs" },
    ],
    time: 30,
    date: "2023-08-25",
  },
  {
    title: "Intense Cardio Workout",
    summary: "Elevate your heart rate and burn calories with this cardio routine.",
    workouts: [
      { title: "Running", duration: "20 minutes", area: "Cardio" },
    ],
    likes: 10,
    user: "CardioKing123",
  },
  // Add more routine history data
];

const initialRoutinesData = [
  {
    title: "Chest Workout",
    summary: "A routine to target your chest muscles.",
    workouts: [
      { title: "Bench Press", duration: "4 sets x 10 reps", area: "Chest" },
      {
        title: "Incline Dumbbell Press",
        duration: "3 sets x 12 reps",
        area: "Chest",
      },
    ],
    likes: 10,
    user: "FitnessEnthusiast123",
  },
  {
    title: "Core Blaster",
    summary: "Strengthen your core with these effective exercises.",
    workouts: [
      { title: "Plank", duration: "3 sets x 30 seconds", area: "Core" },
      { title: "Russian Twists", duration: "4 sets x 15 reps", area: "Core" },
    ],
    likes: 8,
    user: "Sarah Craig",
  },
  {
    title: "Leg Day",
    summary: "Get those leg muscles burning with this intense leg day routine.",
    workouts: [
      { title: "Squats", duration: "5 sets x 8 reps", area: "Legs" },
      { title: "Lunges", duration: "3 sets x 12 reps", area: "Legs" },
    ],
    likes: 15,
    user: "GymWarrior789",
  },
  {
    title: "Gain Arm definition",
    summary: "Build strong and defined arms with this workout.",
    workouts: [
      { title: "Bicep Curls", duration: "4 sets x 10 reps", area: "Arms" },
      { title: "Tricep Dips", duration: "3 sets x 12 reps", area: "Arms" },
    ],
    likes: 18,
    user: "Alex Steven",
  },
  {
    title: "Shoulder Shaper",
    summary: "Target your shoulders for a powerful upper body.",
    workouts: [
      {
        title: "Overhead Press",
        duration: "4 sets x 8 reps",
        area: "Shoulders",
      },
      {
        title: "Lateral Raises",
        duration: "3 sets x 15 reps",
        area: "Shoulders",
      },
    ],
    likes: 12,
    user: "ShoulderGuru567",
  },
  {
    title: "Intense Cardio Workout",
    summary:
      "Elevate your heart rate and burn calories with this cardio routine.",
    workouts: [
      { title: "Running", duration: "20 minutes", area: "Cardio" },
      { title: "Jumping Jacks", duration: "4 sets x 20 reps", area: "Cardio" },
    ],
    likes: 10,
    user: "CardioKing123",
  },
  {
    title: "Full Body Workout",
    summary: "Efficient workout tackling all areas",
    workouts: [
      { title: "Running", duration: "20 minutes", area: "Cardio" },
      { title: "Bicep Curls", duration: "4 sets x 10 reps", area: "Arms" },
      { title: "Squats", duration: "5 sets x 8 reps", area: "Legs" },
      { title: "deadlifts", duration: "5 sets x 8 reps", area: "Back" },
    ],
    likes: 12,
    user: "Joe Smith",
  },
];

const initalSavedRoutineData = [
  {
    title: "Efficient Full Body Workout",
    workouts: [{ title: "Push-ups", duration: "3 sets x 15 reps" }],
  },
  {
    title: "Inner chest workout",
    workouts: [{ title: "chest flys", duration: "3 sets x 10 reps" }],
  },
  // Add more saved routine data
];

const initalCreatedRoutineData = [
  {
    title: "My Cool Chest Workout",
    workouts: [
      { title: "benchpress", duration: "3 sets x 15 reps" },
      { title: "incline dummbell press", duration: "3 sets x 10 reps" },
    ],
  },
  {
    title: "My legs Workout",
    workouts: [{ title: "squats", duration: "4 sets x 10 reps" }],
  },
  // Add more created routine data
];

const RecommendationsPage = () => {
  // Tally the workout areas from routine history data
  const workoutAreasTally = {};
  initalRoutineHistoryData.forEach((routine) => {
    routine.workouts.forEach((workout) => {
      const area = workout.area.toLowerCase();
      if (workoutAreasTally[area]) {
        workoutAreasTally[area]++;
      } else {
        workoutAreasTally[area] = 1;
      }
    });
  });

  // Sort workout areas by tally count in descending order
  const sortedWorkoutAreas = Object.keys(workoutAreasTally).sort(
    (a, b) => workoutAreasTally[b] - workoutAreasTally[a]
  );

  // Filter and recommend routines based on most worked out areas
  const recommendedRoutines = initialRoutinesData.filter((routine) => {
    const routineAreas = routine.workouts.map((workout) => workout.area.toLowerCase());
    return routineAreas.some((area) => sortedWorkoutAreas.includes(area)) &&
           !initalSavedRoutineData.some((savedRoutine) => savedRoutine.title === routine.title) &&
           !initalCreatedRoutineData.some((createdRoutine) => createdRoutine.title === routine.title);
  });

  const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
  const [selectedRoutine, setSelectedRoutine] = React.useState(null);

  const handleInfoClick = (routine) => {
    setSelectedRoutine(routine);
    setOpenInfoDialog(true);
  };

  const handleCloseInfoDialog = () => {
    setOpenInfoDialog(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Your Recommendations
      </Typography>
      <Typography variant="body1">
        Based on the areas that you worked out the most in routines history, the 3 recommended routines are:
      </Typography>
      <List>
        {recommendedRoutines.slice(0, 3).map((routine, index) => (
          <ListItem key={index}
          style={{
              borderRadius: "12px",
              marginBottom: "10px",
              background: "#f5f5f5",
              border: "3px solid green",
              padding: "10px",
            }}>
            <ListItemText
              primary={routine.title}
              secondary={routine.summary}
              
            />
            <IconButton onClick={() => handleInfoClick(routine)}>
              <InfoIcon />
            </IconButton>
            <IconButton>
              <BookmarkIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Dialog open={openInfoDialog} onClose={handleCloseInfoDialog}>
        {selectedRoutine && (
          <div>
            <DialogTitle>{selectedRoutine.title}</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1">
                User: {selectedRoutine.user}
              </Typography>
              {/* Display workout details */}
              <Typography variant="subtitle1">Workouts:</Typography>
              <List>
                {selectedRoutine.workouts.map((workout, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={workout.title}
                      secondary={`Duration: ${workout.duration}, Area: ${workout.area}`}
                    />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </Container>
  );
};

export default RecommendationsPage;