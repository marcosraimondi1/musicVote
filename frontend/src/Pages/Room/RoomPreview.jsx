import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function RoomPreview() {
  const [roomCode, setRoomCode] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState("");
  const [n_options, setN_options] = useState(2);

  const navigate = useNavigate();

  const startRoom = async () => {
    if (playlistId == "") {
      alert("Choose a playlist");
      return;
    }
    const url = import.meta.env.VITE_API_BASE_URL;
    const toSend = {
      code: roomCode,
      playlistId,
      n_options
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
      setPlaylistId(data.data[0].id);
    }
  }, []);

  return (
    <>
      <Header id="spotify-masthead" title={`Room ${roomCode}`} description="Room Config">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div>
            <p>Choose a playist of possible options:</p>
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
          </div>
          <div>
            <p>N° of options: </p>
            <input
              type="number"
              step={1}
              min={2}
              max={5}
              value={n_options}
              onChange={(ev) => setN_options(ev.target.value)}
            />
          </div>
          <br />
          <button onClick={startRoom}>START</button>
        </div>
      </Header>
      <Footer />
    </>
  );
}
