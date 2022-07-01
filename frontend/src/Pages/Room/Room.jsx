import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

export default function Room() {
  const [roomCode, setRoomCode] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState({});
  const [options, setOptions] = useState([]);
  const [session, setSession] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    setRoomCode(code);

    const ses = JSON.parse(window.localStorage.getItem("session"));
    setSession(ses);

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
          setCurrentlyPlaying(data.data.currentlyPlaying);
          setOptions(data.data.options);
        } else {
          alert("Room not found");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      clearInterval(dataPolling);
    };
  }, []);
  console.log(options);
  return (
    <>
      <Header id="spotify-masthead" title={`Room ${roomCode}`} description="Vote for next song">
        <div>
          <h4>Currently Playing</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <img src={currentlyPlaying?.image} alt="Album" height="100" width="100" />
            <div style={{ width: 100, height: 5, margin: 2 }}>
              <ProgressBar
                bgcolor="#ef6c00"
                completed={Math.floor(
                  (currentlyPlaying?.progress_ms / currentlyPlaying?.duration_ms) * 100
                )}
              />
            </div>
            <b>{currentlyPlaying?.name}</b>
            {currentlyPlaying?.artists?.map((artist, index) => (
              <p key={index}>{artist}</p>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          {options?.map((option, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <button>
                <b>{option?.name}</b>
              </button>
              <br></br>
              <img src={option?.image} alt="Album" height="50" width="50" />
              <p>{option?.artists[0]?.name}</p>
            </div>
          ))}
        </div>
      </Header>
      <Footer />
    </>
  );
}
