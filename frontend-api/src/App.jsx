import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import HomeScreen from "./screens/Home";
import AboutScreen from "./screens/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
      </Routes>
    </BrowserRouter>
  );
}