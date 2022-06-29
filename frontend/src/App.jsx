import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Room from "./Pages/Room/Room";
import RoomPreview from "./Pages/Room/RoomPreview";

/**
 * R O U T E R
 */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/room" element={<Room />} />
        <Route path="/create" element={<RoomPreview />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
