import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { Card, Box, Button, TextareaAutosize } from "@mui/material";

const List = ({ id, task, setUpdateUI, updateMode }) => {
  const [editTask, setEditTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTask(task);
  };

  const handleSaveEdit = () => {
    axios.put(`${baseURL}/update/${id}`, { task: editTask }).then((res) => {
      console.log(res.data);
      setIsEditing(false);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const handleChange = (e) => {
    setEditTask(e.target.value);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "50vw",
        my: 2,
        p: 1,
        boxShadow: 3,
        borderWidth: 2,
        borderColor: "blue",
      }}
    >
      {isEditing ? (
        <TextareaAutosize
          value={editTask}
          onChange={handleChange}
          style={{
            resize: "none",
            minHeight: "50px",
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "inherit",
          }}
        />
      ) : (
        <div style={{ wordBreak: "break-all" }}>{task}</div>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          marginTop: 1,
        }}
      >
        {isEditing ? (
          <>
            <Button variant="contained" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="contained" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <BiEditAlt className="icon" onClick={handleEdit} />
        )}
        <BsTrash className="icon" onClick={removeTask} />
      </Box>
    </Card>
  );
};

export default List;
