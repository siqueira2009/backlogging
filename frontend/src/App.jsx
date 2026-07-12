import React from "react";
import { EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import SignIn from "./screens/Account/SignIn";
import SignUp from "./screens/Account/SignUp";

export default function App() {
  return (
    <EmojiProvider data={emojiData}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/create" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </EmojiProvider>
  );
}