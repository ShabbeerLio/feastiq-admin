import React, { useContext, useEffect } from 'react'
import "./Home.css"
import NoteContext from '../../Context/NoteContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { notes, getDetails } = useContext(NoteContext);
   const navigate = useNavigate();
  useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      } else {
        getDetails();
      }
    }, [navigate]);
  return (
    <div>
      home
    </div>
  )
}

export default Home
