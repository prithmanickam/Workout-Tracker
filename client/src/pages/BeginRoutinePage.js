import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const BeginRoutinePage = ({ createdWorkouts }) => {
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);
  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds

  const predefinedWorkouts = [
    {
      id: 'predefined-1',
      title: 'Full Chest Workout',
      numWorkouts: '2',
      summary: 'Intense chest workout, lots of reps',
      workouts: [
        {
          title: 'Bench Press',
          area: '',
          setRepDuration: '4 sets 12 reps',
          tips: 'go slowly on the way down, and fast up',
          image: '',
        },
        {
          title: 'Lateral Raises',
          area: 'Chest',
          setRepDuration: '4 sets 12 reps',
          tips: '',
          image: '',
        },
      ],
    },
    // Add more predefined routines as needed
  ];

  const allWorkouts = [...createdWorkouts, ...predefinedWorkouts];

  useEffect(() => {
    let timerInterval;

    if (showWorkoutDetails) {
      timerInterval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [showWorkoutDetails]);

  const handleSelectRoutine = (event) => {
    const selectedId = event.target.value;
    const selected = allWorkouts.find(workout => workout.id === selectedId);
    setSelectedRoutine(selected);
    setShowWorkoutDetails(false);
    setElapsedTime(0); // Reset timer when selecting a new routine
  };

  const handleBeginClick = () => {
    setShowWorkoutDetails(true);
    setWorkoutIndex(0);
  };

  const handleNextWorkout = () => {
    if (workoutIndex < selectedRoutine.workouts.length - 1) {
      setWorkoutIndex(workoutIndex + 1);
    } else {
      // End of routine, perform actions
      setShowWorkoutDetails(false);
      setElapsedTime(0); // Reset timer when routine ends
      console.log(`Total Workout Time: ${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, '0')}`);
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h4">Select Workout Routine</Typography>
      <FormControl fullWidth>
        <InputLabel>From created workouts</InputLabel>
        <Select
          value={selectedRoutine ? selectedRoutine.id : ''}
          onChange={handleSelectRoutine}
        >
          {allWorkouts.map(routine => (
            <MenuItem key={routine.id} value={routine.id}>
              {routine.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedRoutine && (
        <Paper style={{ border: '2px solid grey', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Routine Details
          </Typography>
          <Typography variant="subtitle1">
            Title: {selectedRoutine.title}
          </Typography>
          <Typography variant="subtitle1">
            Summary: {selectedRoutine.summary}
          </Typography>
          <Typography variant="subtitle1">
            No. of Workouts: {selectedRoutine.numWorkouts}
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
            {selectedRoutine &&
              selectedRoutine.workouts.map((workout, index) => (
                <ListItem key={index}>
                  <ListItemText primary={workout.title} secondary={workout.setRepDuration} />
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>
      
      {/* Timer and Workout Display */}
      {showWorkoutDetails ? (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Elapsed Time: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
          </Typography>
          <Paper style={{ border: '2px solid blue', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
            <Typography variant="h6">Workout {workoutIndex + 1}</Typography>
            <Typography variant="subtitle1">
              Title: {selectedRoutine.workouts[workoutIndex].title}
            </Typography>
            <Typography variant="subtitle1">
              Area: {selectedRoutine.workouts[workoutIndex].area}
            </Typography>
            {/* Include other workout details here */}
          </Paper>
          {workoutIndex !== selectedRoutine.workouts.length - 1 && (
            <Button onClick={handleNextWorkout}>
              Next Workout
            </Button>
          )}
          {workoutIndex === selectedRoutine.workouts.length - 1 && (
            <Button onClick={handleNextWorkout}>
              End Workout
            </Button>
          )}
        </Container>
      ) : (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button onClick={handleBeginClick}>
            Begin Workout
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default BeginRoutinePage;
