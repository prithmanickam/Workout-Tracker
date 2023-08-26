import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CreateWorkoutRoutine = () => {
  const [routineData, setRoutineData] = useState({
    title: '',
    summary: '',
    numWorkouts: '',
    workouts: [{ title: '', area: '', setRepDuration: '', tips: '', image: '' }],
  });

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedWorkouts = [...routineData.workouts];
    updatedWorkouts[index][name] = value;
    setRoutineData({ ...routineData, workouts: updatedWorkouts });
  };

  const handleAddWorkout = () => {
    setRoutineData({
      ...routineData,
      workouts: [...routineData.workouts, { title: '', area: '', setRepDuration: '', tips: '', image: '' }],
    });
  };

  const handleSaveRoutine = () => {
    console.log(routineData);
    // You can perform any further actions here, like storing data in a database.
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ outline: '2px solid black', padding: '20px', borderRadius: '10px', margin: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Create your workout routine
        </Typography>

        <TextField
          label="Title"
          fullWidth
          value={routineData.title}
          onChange={(e) => setRoutineData({ ...routineData, title: e.target.value })}
        />

        <TextField
          label="Summary (max 120 characters)"
          fullWidth
          value={routineData.summary}
          onChange={(e) => setRoutineData({ ...routineData, summary: e.target.value })}
        />

        <TextField
          label="No. of Workouts"
          type="number"
          fullWidth
          value={routineData.numWorkouts}
          onChange={(e) => setRoutineData({ ...routineData, numWorkouts: e.target.value })}
        />
      </div>

      {routineData.workouts.map((workout, index) => (
        <div key={index} style={{ outline: '2px solid blue', padding: '20px', borderRadius: '10px', margin: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '20px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const image = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = () => {
                    const imageData = reader.result;
                    const updatedWorkouts = [...routineData.workouts];
                    updatedWorkouts[index].image = imageData;
                    setRoutineData({ ...routineData, workouts: updatedWorkouts });
                  };
                  reader.readAsDataURL(image);
                }}
              />
              {workout.image && <img src={workout.image} alt={`Workout ${index + 1}`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
            </div>
            <div>
              <TextField
                name="title"
                label={`Workout ${index + 1} Title`}
                fullWidth
                value={workout.title}
                onChange={(e) => handleInputChange(index, e)}
              />

              <FormControl fullWidth>
                <InputLabel>Area</InputLabel>
                <Select
                  name="area"
                  value={workout.area}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <MenuItem value="Core">Core</MenuItem>
                  <MenuItem value="Cardio">Cardio</MenuItem>
                  <MenuItem value="Chest">Chest</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>

              <TextField
                name="setRepDuration"
                label={`Set/Rep or Duration`}
                fullWidth
                value={workout.setRepDuration}
                onChange={(e) => handleInputChange(index, e)}
              />

              <TextField
                name="tips"
                label={`Tips`}
                fullWidth
                multiline
                rows={3}
                value={workout.tips}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={handleAddWorkout}
        style={{ marginTop: '20px', alignSelf: 'center' }}
      >
        Add another workout
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveRoutine}
        style={{ marginTop: '20px', alignSelf: 'center' }}
      >
        Save your workout routine
      </Button>
    </div>
  );
};

export default CreateWorkoutRoutine;
