import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

// import { editColorService, deleteColorService } from '../services/colorServices';
// import fetchColorService from '../services/fetchColorService';
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  const {id} = useParams();
  let {push} = useHistory();

  useEffect(() => {
    axiosWithAuth().get('/colors')
    .then(res => {
      setColors(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth().put(`/colors/${id}`, editColor)
    .then(res => {
      setColors(res.data)
    })
    .catch(err => console.log(err))
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`/colors/${id}`)
    .then(res => {
      setColors(res.data)
      push('/BubblePage')
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete saveEdit, deleteColor functions
