import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function Login() {
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

  const join = async (roomId) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const url = `${API_BASE_URL}/join?roomId=${roomId}`;
      let res = await fetch(url, {
        method: "GET",
        mode: "cors"
      });
      if (res.status === 200) {
        alert("Success");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header id="spotify-masthead" title="Spotify Voting Lobby" description="Join or Start a room">
        <button onClick={() => join(10)}>Join Room</button>
        <button onClick={login}>New Room</button>
      </Header>
      <Footer />
    </>
  );
}
