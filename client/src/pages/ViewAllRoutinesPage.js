import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";

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
  {
    title: "My Cool Chest Workout",
    summary: "Target all of Chest.",
    workouts: [
      { title: "Bench Press", duration: "3 sets x 15 reps", area: "Chest" },
      {
        title: "Incline Dumbbell Press",
        duration: "3 sets x 10 reps",
        area: "Chest",
      },
    ],
    likes: 0,
    user: "Prith M",
  }
];

const ViewAllRoutinesPage = () => {
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const routinesPerPage = 4;

  const [routinesData, setRoutinesData] = useState([...initialRoutinesData]);

  const handleInfoClick = (routine) => {
    setSelectedRoutine(routine);
    setOpenInfoDialog(true);
  };

  const handleCloseInfoDialog = () => {
    setOpenInfoDialog(false);
  };

  const handleLikeClick = (routineIndex) => {
    const routineToUpdate = currentRoutines[routineIndex];
    const routineDataIndex = routinesData.findIndex(
      (routine) => routine === routineToUpdate
    );

    if (routineDataIndex !== -1) {
      const updatedRoutinesData = [...routinesData];
      updatedRoutinesData[routineDataIndex] = {
        ...routineToUpdate,
        likes: routineToUpdate.likes + 1,
      };
      setRoutinesData(updatedRoutinesData);
    }
  };

  const handleSaveClick = (routineIndex) => {
    // Implement save logic here
  };

  const sortedRoutines = [...routinesData].sort((a, b) => b.likes - a.likes);

  const indexOfLastRoutine = currentPage * routinesPerPage;
  const indexOfFirstRoutine = indexOfLastRoutine - routinesPerPage;
  const currentRoutines = sortedRoutines.slice(
    indexOfFirstRoutine,
    indexOfLastRoutine
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(sortedRoutines.length / routinesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        All Routines
      </Typography>
      <List>
        {currentRoutines.map((routine, index) => (
          <ListItem
            key={index}
            style={{
              borderRadius: "12px",
              marginBottom: "10px",
              background: "#f5f5f5",
              border: "1px solid #555",
              padding: "10px",
            }}
          >
            <ListItemText primary={routine.title} secondary={routine.summary} />
            <Typography variant="body2" color="textSecondary">
              Posted by: {routine.user}
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => handleInfoClick(routine)}
                color="primary"
              >
                <InfoIcon />
              </IconButton>
              <IconButton
                onClick={() => handleLikeClick(index)}
                color="secondary"
              >
                <FavoriteIcon />
                <Typography variant="body2" style={{ marginLeft: "5px" }}>
                  {routine.likes}
                </Typography>
              </IconButton>
              <IconButton onClick={() => handleSaveClick(index)}>
                <BookmarkIcon color={routine.saved ? "primary" : "inherit"} />
              </IconButton>
            </div>
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
              <Typography variant="subtitle1">Workouts:</Typography>
              <List>
                {selectedRoutine.workouts.map((workout, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={workout.title}
                      secondary={workout.duration}
                    />
                    <Typography variant="body2" color="textSecondary">
                      Area: {workout.area}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </div>
        )}
      </Dialog>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant="outlined"
            onClick={() => setCurrentPage(number)}
            disabled={currentPage === number}
          >
            {number}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default ViewAllRoutinesPage;
