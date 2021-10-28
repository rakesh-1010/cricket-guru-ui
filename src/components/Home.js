import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import logo from '../assets/cc.jpeg'; // with import



const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Welcome to CricketGuru</h3>
        <p>
          The proposed Cricket Academy Management System
          is completely automated. The proposed system allows
          the admin and coaches to maintain various records,
          register for the various training batches,Diet
          Plan,Manage schedule,Player record and Coaches
          player Ratings. Less effort is required for maintaining
          the database of online cricket Academy Management
          using this software.
        </p>
        <img src={logo} />
      </header>
    </div>
  );
};

export default Home;