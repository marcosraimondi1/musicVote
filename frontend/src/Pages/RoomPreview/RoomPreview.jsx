import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useRoomPreview } from "./RoomPreviewLogic";

export default function RoomPreview() {
  const { startRoom, roomCode, playlists, playlistId, n_options, setPlaylistId, setN_options } =
    useRoomPreview();

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
