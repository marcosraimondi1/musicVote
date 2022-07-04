import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useRoom } from "./RoomLogic";

export default function Room() {
  const { vote, leaveRoom, roomCode, options, voted, currentlyPlaying } = useRoom();

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
              <button disabled={voted} onClick={() => vote(index)}>
                <b>{option?.name}</b>
              </button>
              <br></br>
              <img src={option?.image} alt="Album" height="50" width="50" />
              <p>{option?.artists[0]?.name}</p>
              <p>
                Votes: <b>{option?.votes}</b>
              </p>
            </div>
          ))}
        </div>
        <div>
          <button onClick={leaveRoom}>Leave</button>
        </div>
      </Header>
      <Footer />
    </>
  );
}
