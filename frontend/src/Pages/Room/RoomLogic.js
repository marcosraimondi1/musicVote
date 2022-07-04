import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useRoom() {
  const [roomCode, setRoomCode] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState({});
  const [options, setOptions] = useState([]);
  const [session, setSession] = useState({});
  const [voted, setVoted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    setRoomCode(code);

    let ses = {};
    try {
      ses = JSON.parse(window.localStorage.getItem("session"));
      setSession(ses);
    } catch (error) {
      setSession({});
      ses = {};
    }

    const dataPolling = setInterval(fetchData, 1000);

    async function fetchData() {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      try {
        const url = `${API_BASE_URL}/playback?code=${code}`;
        const res = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            session: JSON.stringify(ses),
            ContentType: "application/json"
          }
        });

        const data = await res.json();

        if (data.status === "success") {
          setCurrentlyPlaying(data.data.currently_playing);
          setOptions(data.data.options);
        } else {
          alert("Room not found");
          navigate("../", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      clearInterval(dataPolling);
    };
  }, []);

  useEffect(() => {
    setVoted(false);
  }, [options[0]?.id]);

  const vote = async (option) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const url = `${API_BASE_URL}/playback`;

      const body = { option, code: roomCode };
      await fetch(url, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          session: JSON.stringify(session)
        },
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.log(error);
    }
    setVoted(true);
  };

  const leaveRoom = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const url = `${API_BASE_URL}/room?code=${roomCode}`;

      await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          session: JSON.stringify(session)
        }
      });
      navigate("../", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return { vote, leaveRoom, roomCode, options, voted, currentlyPlaying };
}
