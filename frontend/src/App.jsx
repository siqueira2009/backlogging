import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/create" element={<SignUp />} />
       </Routes>
    </BrowserRouter>
  );
}