import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import CommentsPage from "./pages/CommentsPage";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import CreateRoutinePage from "./pages/CreateRoutinePage";
import BeginRoutinePage from "./pages/BeginRoutinePage";
import DashboardPage from "./pages/DashboardPage";
import ViewAllRoutinesPage from "./pages/ViewAllRoutinesPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import { UserContextProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [createdWorkouts, setCreatedWorkouts] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
      setCreatedWorkouts(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    });
  };

  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/"
          element={isLoggedIn === "true" ? <AccountPage /> : <LoginPage />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/viewallroutines" element={<ViewAllRoutinesPage />} />
        <Route path="/comments" element={<CommentsPage />} />

        {/* Protected Routes */}
        {isLoggedIn === "true" ? (
          <>
            <Route path="/createroutine" element={<UserContextProvider> <CreateRoutinePage /> </UserContextProvider>} />
            <Route
              path="/beginroutine"
              element={<BeginRoutinePage createdWorkouts={createdWorkouts} />}
            />
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/account" element={<UserContextProvider> <AccountPage /> </UserContextProvider>} />
          </>
        ) : (
          // Redirect to login page if not logged in
          <Route
            path="*"
            element={
              <>
                {/* Show a toast message */}
                <Navigate to="/login" />
              </>
            }
          />
        )}
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
