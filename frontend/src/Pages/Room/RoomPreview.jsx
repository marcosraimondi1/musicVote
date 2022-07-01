import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function RoomPreview() {
  const [roomCode, setRoomCode] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState("");

  const navigate = useNavigate();

  const startRoom = async () => {
    if (playlistId == "") {
      alert("Choose a playlist");
      return;
    }
    const url = import.meta.env.VITE_API_BASE_URL;
    const toSend = {
      code: roomCode,
      playlistId
    };
    const res = await fetch(url + "/room", {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(toSend),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    if (data.status != "success") {
      alert("error al crear sala, intente de nuevo");
      navigate("../", { replace: true });
      return;
    }

    localStorage.setItem("session", JSON.stringify(data.session));

    navigate("../room?code=" + roomCode, { replace: true });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    setRoomCode(code);

    fetchPlaylists();

    async function fetchPlaylists() {
      const url = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(url + "/getPlaylists?code=" + code, {
        method: "GET",
        mode: "cors"
      });

      const data = await res.json();

      if (data.status != "success") {
        alert("error al buscar las playlists");
        navigate("../", { replace: true });
        return;
      }

      setPlaylists(data.data);
    }
  }, []);

  return (
    <>
      <Header id="spotify-masthead" title={`Room ${roomCode}`} description="Vote for next song">
        <select
          value={playlistId}
          onChange={(event) => {
            setPlaylistId(event.target.value);
          }}
        >
          {playlists?.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <button onClick={startRoom}>JOIN</button>
      </Header>
      <Footer />
    </>
  );
}
