import React, { useState, useEffect } from "react";
import {
  Typography,
  Select,
  FormControl,
  MenuItem,
  Button,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
  Paper,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const BeginRoutinePage = ({ createdWorkouts }) => {
  const [selectedCreatedRoutine, setSelectedCreatedRoutine] = useState(null);
  const [selectedSavedRoutine, setSelectedSavedRoutine] = useState(null);
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);
  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds

  const createdRoutineData = [
    {
      title: "My Cool Chest Workout",
      numWorkouts: "2",
      summary: "Target all of Chest.",
      workouts: [
        { title: "Bench Press", duration: "3 sets x 15 reps", area: "Chest" },
        {
          title: "Incline Dumbbell Press",
          duration: "3 sets x 10 reps",
          area: "Chest",
        },
      ],
    },
    {
      title: "My legs Workout",
      numWorkouts: "1",
      summary: "Quads isolation",
      workouts: [
        { title: "squats", duration: "4 sets x 10 reps", area: "Legs" },
      ],
    },
    // Add more created routine data
  ];

  const savedRoutineData = [
    {
      title: "Efficient Full Body Workout",
      numWorkouts: "1",
      summary: "lots of everything",
      workouts: [
        { title: "Push-ups", duration: "3 sets x 15 reps", area: "Arms" },
      ],
    },
    {
      title: "Inner chest workout",
      numWorkouts: "2",
      summary: "lots of everything",
      workouts: [
        { title: "chest flys", duration: "3 sets x 10 reps", area: "Chest" },
        {
          title: "incline dumbell",
          duration: "3 sets x 10 reps",
          area: "Chest",
        },
      ],
    },
    // Add more saved routine data
  ];

  const allCreatedWorkouts = createdRoutineData;
  const allSavedWorkouts = savedRoutineData;

  useEffect(() => {
    let timerInterval;

    if (showWorkoutDetails) {
      timerInterval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [showWorkoutDetails]);

  const handleSelectCreatedRoutine = (event) => {
    const selectedId = event.target.value;
    const selected = allCreatedWorkouts.find(
      (workout) => workout.id === selectedId
    );
    setSelectedCreatedRoutine(selected);
    setSelectedSavedRoutine(null);
    setShowWorkoutDetails(false);
    setElapsedTime(0); // Reset timer when selecting a new routine
  };

  const handleSelectSavedRoutine = (event) => {
    const selectedId = event.target.value;
    const selected = allSavedWorkouts.find(
      (workout) => workout.id === selectedId
    );
    setSelectedSavedRoutine(selected);
    setSelectedCreatedRoutine(null);
    setShowWorkoutDetails(false);
    setElapsedTime(0); // Reset timer when selecting a new routine
  };

  const handleBeginClick = () => {
    setShowWorkoutDetails(true);
    setWorkoutIndex(0);
  };

  const handleNextWorkout = () => {
    if (
      workoutIndex <
      (selectedCreatedRoutine || selectedSavedRoutine).workouts.length - 1
    ) {
      setWorkoutIndex(workoutIndex + 1);
    } else {
      setShowWorkoutDetails(false);
      setElapsedTime(0);
      console.log(
        `Total Workout Time: ${Math.floor(elapsedTime / 60)}:${(
          elapsedTime % 60
        )
          .toString()
          .padStart(2, "0")}`
      );
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4">Select Workout Routine</Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <FormControl fullWidth style={{ marginRight: "10px" }}>
          <InputLabel>From created workouts</InputLabel>
          <Select
            value={selectedCreatedRoutine ? selectedCreatedRoutine.id : ""}
            onChange={handleSelectCreatedRoutine}
          >
            {allCreatedWorkouts.map((routine) => (
              <MenuItem key={routine.id} value={routine.id}>
                {routine.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>From saved workouts</InputLabel>
          <Select
            value={selectedSavedRoutine ? selectedSavedRoutine.id : ""}
            onChange={handleSelectSavedRoutine}
          >
            {allSavedWorkouts.map((routine) => (
              <MenuItem key={routine.id} value={routine.id}>
                {routine.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {selectedCreatedRoutine && (
        <Paper
          style={{
            border: "2px solid grey",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Routine Details
          </Typography>
          <Typography variant="subtitle1">
            Title: {selectedCreatedRoutine.title}
          </Typography>
          <Typography variant="subtitle1">
            Summary: {selectedCreatedRoutine.summary}
          </Typography>
          <Typography variant="subtitle1">
            No. of Workouts: {selectedCreatedRoutine.numWorkouts}
          </Typography>
          <IconButton onClick={() => setOpenInfoDialog(true)}>
            <InfoIcon />
          </IconButton>
        </Paper>
      )}

      {selectedSavedRoutine && (
        <Paper
          style={{
            border: "2px solid grey",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Routine Details
          </Typography>
          <Typography variant="subtitle1">
            Title: {selectedSavedRoutine.title}
          </Typography>
          <Typography variant="subtitle1">
            Summary: {selectedSavedRoutine.summary}
          </Typography>
          <Typography variant="subtitle1">
            No. of Workouts: {selectedSavedRoutine.numWorkouts}
          </Typography>
          <IconButton onClick={() => setOpenInfoDialog(true)}>
            <InfoIcon />
          </IconButton>
        </Paper>
      )}

      {/* Workout Details Dialog */}
      <Dialog open={openInfoDialog} onClose={() => setOpenInfoDialog(false)}>
        <DialogTitle>Workout Details</DialogTitle>
        <DialogContent>
          <List>
            {selectedCreatedRoutine &&
              selectedCreatedRoutine.workouts.map((workout, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={workout.title}
                    secondary={workout.setRepDuration}
                  />
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>

      {showWorkoutDetails ? (
        <Container
          maxWidth="sm"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Elapsed Time: {Math.floor(elapsedTime / 60)}:
            {(elapsedTime % 60).toString().padStart(2, "0")}
          </Typography>
          <Paper
            style={{
              border: "2px solid blue",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <Typography variant="h6">Workout {workoutIndex + 1}</Typography>
            <Typography variant="subtitle1">
              Title:{" "}
              {
                (selectedCreatedRoutine || selectedSavedRoutine).workouts[
                  workoutIndex
                ].title
              }
            </Typography>
            <Typography variant="subtitle1">
              Area:{" "}
              {
                (selectedCreatedRoutine || selectedSavedRoutine).workouts[
                  workoutIndex
                ].area
              }
            </Typography>
            <Typography variant="subtitle1">
              Duration:{" "}
              {
                (selectedCreatedRoutine || selectedSavedRoutine).workouts[
                  workoutIndex
                ].duration
              }
            </Typography>
            {/* Include other workout details here */}
          </Paper>
          {workoutIndex !==
            (selectedCreatedRoutine || selectedSavedRoutine).workouts.length -
              1 && <Button onClick={handleNextWorkout}>Next Workout</Button>}
          {workoutIndex ===
            (selectedCreatedRoutine || selectedSavedRoutine).workouts.length -
              1 && <Button onClick={handleNextWorkout}>End Workout</Button>}
        </Container>
      ) : (
        <Container
          maxWidth="sm"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <Button onClick={handleBeginClick}>Begin Workout</Button>
        </Container>
      )}
    </Container>
  );
};

export default BeginRoutinePage;
