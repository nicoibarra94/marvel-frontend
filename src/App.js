import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import Header from "./components/Header";
import Personnages from "./pages/Personnages";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken" || null));

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Personnages />} />
        <Route path="character/:id" element={<Character />} />
        <Route path="/comics" element={<Comics />} />
        <Route
          path="/signup"
          element={<Signup setUser={setUser} token={token} />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/favorites" element={<Favorites token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
