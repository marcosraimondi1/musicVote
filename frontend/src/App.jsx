import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Room from "./Pages/Room/Room";

/**
 * G L O B A L   V A R I A B L E S
 */

global.BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * R O U T E R
 */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/room" element={<Room />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
