import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useRoomPreview() {
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

  return { startRoom, roomCode, playlists, playlistId, n_options, setPlaylistId, setN_options };
}
