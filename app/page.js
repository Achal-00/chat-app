"use client";

import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chooseLog, setChooseLog] = useState(true);
  const [username, setUsername] = useState("");

  return isLoggedIn ? (
    <HomePage username={username} />
  ) : chooseLog ? (
    <Login
      setIsLoggedIn={setIsLoggedIn}
      setChooseLog={setChooseLog}
      setUsername={setUsername}
    />
  ) : (
    <Signup
      setIsLoggedIn={setIsLoggedIn}
      setChooseLog={setChooseLog}
      setUsername={setUsername}
    />
  );
}
