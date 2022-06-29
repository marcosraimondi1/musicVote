import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function Room() {
  const [roomCode, setRoomCode] = useState("");
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setRoomCode(urlParams.get("code"));
  }, []);
  return (
    <>
      <Header id="spotify-masthead" title={`Room ${roomCode}`} description="Vote for next song">
        <button>OPTION 1</button>
        <button>OPTION 2</button>
      </Header>
      <Footer />
    </>
  );
}
