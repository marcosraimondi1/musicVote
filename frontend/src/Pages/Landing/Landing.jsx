import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function Login() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const url = `${API_BASE_URL}/login-spotify`;
      let res = await fetch(url, {
        method: "GET",
        mode: "cors"
      });
      if (res.status === 200) {
        let json = await res.json();
        window.location.href = json.url;
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const join = async (roomCode) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const url = `${API_BASE_URL}/room?code=${roomCode}`;
      const res = await fetch(url, {
        method: "GET",
        mode: "cors"
      });

      const data = await res.json();

      if (data.status === "success") {
        window.localStorage.setItem("session", JSON.stringify(data.session));
        navigate("./room?code=" + roomCode, { replace: true });
        return;
      }
      alert("Room not found");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header id="spotify-masthead" title="Let's DJ" description="Join or Start a room">
        <input value={code} onChange={(ev) => setCode(ev.target.value)} />
        <button onClick={() => join(code)}>Join Room</button>
        <button onClick={login}>New Room</button>
      </Header>
      <Footer />
    </>
  );
}
