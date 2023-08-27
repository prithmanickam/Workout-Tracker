import React from "react";
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
  CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";
import CompareIcon from "@mui/icons-material/Compare";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer, // Add this import
  Tooltip, // Add this import
} from "recharts";

// Sample data for radar chart
const radarData = [
  { category: "Core", value: 4 },
  { category: "Chest", value: 3 },
  { category: "Back", value: 2 },
  { category: "Legs", value: 5 },
  { category: "Cardio", value: 2 },
  { category: "Arms", value: 3 },
  { category: "Shoulders", value: 4 },
];

// Sample data for bar chart
const barChartData = [
  { day: "Mon", time: 45 },
  { day: "Tue", time: 60 },
  { day: "Wed", time: 30 },
  { day: "Thu", time: 75 },
  { day: "Fri", time: 90 },
  { day: "Sat", time: 120 },
  { day: "Sun", time: 60 },
];

// Sample data for routine history
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
    summary:
      "Elevate your heart rate and burn calories with this cardio routine.",
    workouts: [{ title: "Running", duration: "20 minutes", area: "Cardio" }],
    time: 20,
    date: "2023-08-24",
  },
  // Add more routine history data
];

// Sample data for saved routines
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

// Sample data for created routines
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

const friendsData = [
  {
    name: "Alice",
    radarData: [
      { category: "Core", value: 3 },
      { category: "Chest", value: 2 },
      { category: "Back", value: 4 },
      { category: "Legs", value: 2 },
      { category: "Cardio", value: 5 },
      { category: "Arms", value: 3 },
      { category: "Shoulders", value: 2 },
    ],
    barChartData: [
      { day: "Mon", time: 60 },
      { day: "Tue", time: 45 },
      { day: "Wed", time: 50 },
      { day: "Thu", time: 70 },
      { day: "Fri", time: 80 },
      { day: "Sat", time: 90 },
      { day: "Sun", time: 50 },
    ],
  },
  {
    name: "Bob",
    radarData: [
      { category: "Core", value: 4 },
      { category: "Chest", value: 3 },
      { category: "Back", value: 2 },
      { category: "Legs", value: 4 },
      { category: "Cardio", value: 3 },
      { category: "Arms", value: 2 },
      { category: "Shoulders", value: 3 },
    ],
    barChartData: [
      { day: "Mon", time: 50 },
      { day: "Tue", time: 70 },
      { day: "Wed", time: 40 },
      { day: "Thu", time: 80 },
      { day: "Fri", time: 70 },
      { day: "Sat", time: 100 },
      { day: "Sun", time: 60 },
    ],
  },
  // Add more friend data
];

const DashboardPage = () => {
  const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
  const [deleteRoutineDialogOpen, setDeleteRoutineDialogOpen] =
    React.useState(false);
  const [publishRoutineDialogOpen, setPublishRoutineDialogOpen] =
    React.useState(false);
  const [selectedRoutine, setSelectedRoutine] = React.useState(null);
  const [routineToDelete, setRoutineToDelete] = React.useState(null);
  const [routineToPublish, setRoutineToPublish] = React.useState(null);

  const [routineHistoryData, setRoutineHistoryData] = React.useState(
    initalRoutineHistoryData
  );
  const [createdRoutineData, setCreatedRoutineData] = React.useState(
    initalCreatedRoutineData
  );
  const [savedRoutineData, setSavedRoutineData] = React.useState(
    initalSavedRoutineData
  );

  const [openCompareDialog, setOpenCompareDialog] = React.useState(false);
  const [selectedFriend, setSelectedFriend] = React.useState(null);

  const handleInfoClick = (routine) => {
    setSelectedRoutine(routine);
    setOpenInfoDialog(true);
  };

  const handlePublishClick = (routine) => {
    setRoutineToPublish(routine);
    setPublishRoutineDialogOpen(true);
  };

  const handleClosePublishDialog = () => {
    setPublishRoutineDialogOpen(false);
    setRoutineToPublish(null);
  };

  const handleDeleteClick = (routine) => {
    setRoutineToDelete(routine);
    setDeleteRoutineDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteRoutineDialogOpen(false);
    setRoutineToDelete(null);
  };

  const handleCompareClick = (friend) => {
    setSelectedFriend(friend);
    setOpenCompareDialog(true);
  };

  const handleCloseCompareDialog = () => {
    setOpenCompareDialog(false);
    setSelectedFriend(null);
  };

  return (
    <Container maxWidth="l">
      <Container
        maxWidth="md"
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        {/* Radar Chart */}
        <Paper
          elevation={3}
          style={{ flex: 1, padding: "20px", marginRight: "20px" }}
        >
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Workout Areas
          </Typography>
          <RadarChart
            outerRadius={90}
            width={300}
            height={300}
            data={radarData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis />
            <Radar dataKey="value" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </Paper>

        {/* Center Content */}
        <Paper
          elevation={3}
          style={{
            flex: 1,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Circular Icon */}
          <CircularProgress
            variant="static"
            value={70}
            size={150}
            thickness={5}
            style={{ marginBottom: "10px" }}
          />

          {/* User Name */}
          <Typography variant="h5">John Johnson</Typography>
        </Paper>

        {/* Bar Chart */}
        <Paper
          elevation={3}
          style={{ flex: 1, padding: "20px", marginLeft: "20px" }}
        >
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Workout time during last 7 Days
          </Typography>
          <ResponsiveContainer width={300} height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="time" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Container>

      {/* Routine History */}
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Routine History
        </Typography>
        <List>
          {routineHistoryData.map((routine, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleInfoClick(routine)}
            >
              <ListItemText primary={routine.title} secondary={routine.date} />
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  handleInfoClick(routine);
                }}
              >
                <InfoIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Container
        maxWidth="l"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* Created Routines */}
        <Paper
          elevation={3}
          style={{ width: "48%", padding: "20px", marginBottom: "20px" }}
        >
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Created Routines
          </Typography>
          <List>
            {/* Placeholder data */}
            {createdRoutineData.map((routine, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleInfoClick(routine)}
              >
                <ListItemText primary={routine.title} />
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleInfoClick(routine);
                  }}
                >
                  <InfoIcon />
                </IconButton>

                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    setRoutineToPublish(routine);
                    setPublishRoutineDialogOpen(true);
                    // Show the publish confirmation dialog
                  }}
                >
                  <PublishIcon />
                </IconButton>

                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    setRoutineToDelete(routine);
                    setDeleteRoutineDialogOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Saved Routines */}
        <Paper
          elevation={3}
          style={{ width: "48%", padding: "20px", marginBottom: "20px" }}
        >
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Saved Routines
          </Typography>
          <List>
            {/* Placeholder data */}
            {savedRoutineData.map((routine, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleInfoClick(routine)}
              >
                <ListItemText primary={routine.title} />
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleInfoClick(routine);
                  }}
                >
                  <InfoIcon />
                </IconButton>

                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    setRoutineToDelete(routine);
                    setDeleteRoutineDialogOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>

      {/* Friends Section */}
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Friends
        </Typography>
        <List>
          {friendsData.map((friend, index) => (
            <ListItem
              key={index}
              style={{
                borderRadius: "12px",
                marginBottom: "10px",
                background: "#f3f3f3",
                border: "2px solid #e49797",
                padding: "10px",
              }}
            >
              <ListItemText primary={friend.name} />
              <IconButton onClick={() => handleCompareClick(friend)}>
                <CompareIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Dialog for Comparison */}
      <Dialog
        open={openCompareDialog}
        onClose={handleCloseCompareDialog}
        maxWidth="md"
      >
        {selectedFriend && (
          <div>
            <DialogTitle
              style={{
                fontSize: "24px", // Set the desired font size
                textDecoration: "underline", // Add underline
              }}
            >
              Comparison with {selectedFriend.name}
            </DialogTitle>
            <DialogContent>
              {/* Radar Chart */}
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "20px" }}>
                  <Typography variant="h6" style={{ marginBottom: "10px" }}>
                    Your Workout Areas
                  </Typography>
                  <RadarChart
                    outerRadius={90}
                    width={300}
                    height={300}
                    data={radarData} // Use your own data here
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis />
                    <Radar
                      dataKey="value"
                      fill="#8884d8" // Your data color
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </div>
                <div>
                  <Typography variant="h6" style={{ marginBottom: "10px" }}>
                    {selectedFriend.name}'s Workout Areas
                  </Typography>

                  <RadarChart
                    outerRadius={90}
                    width={300}
                    height={300}
                    data={selectedFriend.radarData} // Friend's data
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis />
                    <Radar
                      dataKey="value"
                      fill="#ff0000" // Friend's data color
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </div>
              </div>

              {/* Bar Charts */}
              <Typography variant="h6" style={{ margin: "20px 0" }}>
                Workout time during last 7 Days
              </Typography>
              <div style={{ display: "flex" }}>
                <ResponsiveContainer width={300} height={300}>
                  <BarChart data={barChartData} layout="vertical">
                    {" "}
                    {/* Use your own data here */}
                    <XAxis dataKey="time" />
                    <YAxis dataKey="day" type="category" />
                    <Tooltip />
                    <Bar dataKey="time" fill="#8884d8" />{" "}
                    {/* Your data color */}
                  </BarChart>
                </ResponsiveContainer>
                {selectedFriend.barChartData && (
                  <ResponsiveContainer width={300} height={300}>
                    <BarChart
                      data={selectedFriend.barChartData} // Friend's data
                      layout="vertical"
                    >
                      <XAxis dataKey="time" />
                      <YAxis dataKey="day" type="category" />
                      <Tooltip />
                      <Bar dataKey="time" fill="#ff0000" />{" "}
                      {/* Friend's data color */}
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  margin: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: "#8884d8", // Your data color
                      marginRight: "5px",
                    }}
                  />
                  <span>Your Data</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: "#ff0000", // Friend's data color
                      marginRight: "5px",
                    }}
                  />
                  <span>{selectedFriend.name}'s Data</span>
                </div>
              </div>
            </DialogContent>
          </div>
        )}
      </Dialog>

      {/* Dialog for Routine Details */}
      <Dialog open={openInfoDialog} onClose={() => setOpenInfoDialog(false)}>
        {selectedRoutine && (
          <div>
            <DialogTitle>{selectedRoutine.title}</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1">
                Time: {selectedRoutine.time} mins
              </Typography>
              <Typography variant="subtitle1">
                Date: {selectedRoutine.date}
              </Typography>
              {/* Display workout details */}
              <List>
                {selectedRoutine.workouts.map((workout, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={workout.title}
                      secondary={workout.duration}
                    />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </div>
        )}
      </Dialog>

      {/* Dialog for Publish Confirmation */}
      <Dialog
        open={publishRoutineDialogOpen}
        onClose={handleClosePublishDialog}
      >
        <DialogTitle>Confirm Publish</DialogTitle>
        <DialogContent>
          {routineToPublish && (
            <div>
              <Typography>
                Are you sure you want to Publish "{routineToPublish.title}"
                routine to all users?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  /* Handle deletion */
                }}
              >
                Publish
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClosePublishDialog}
              >
                Cancel
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog open={deleteRoutineDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          {routineToDelete && (
            <div>
              <Typography>
                Are you sure you want to delete the routine "
                {routineToDelete.title}"?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (routineToDelete) {
                    if (createdRoutineData.includes(routineToDelete)) {
                      const updatedRoutines = createdRoutineData.filter(
                        (routine) => routine !== routineToDelete
                      );
                      setCreatedRoutineData(updatedRoutines);
                    } else if (savedRoutineData.includes(routineToDelete)) {
                      const updatedSavedRoutines = savedRoutineData.filter(
                        (routine) => routine !== routineToDelete
                      );
                      setSavedRoutineData(updatedSavedRoutines);
                    }
                    handleCloseDeleteDialog();
                  }
                }}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseDeleteDialog}
              >
                Cancel
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default DashboardPage;
