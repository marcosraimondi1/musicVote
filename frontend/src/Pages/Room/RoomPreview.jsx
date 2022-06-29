import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function RoomPreview() {
  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();

  const startRoom = async () => {
    const url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(url + "/room", {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({ code: roomCode })
    });

    const data = await res.json();

    localStorage.setItem("session", JSON.stringify(data.session));

    navigate("../room?code=" + roomCode, { replace: true });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setRoomCode(urlParams.get("code"));
  }, []);

  return (
    <>
      <Header id="spotify-masthead" title={`Room ${roomCode}`} description="Vote for next song">
        <button onClick={startRoom}>JOIN</button>
      </Header>
      <Footer />
    </>
  );
}
