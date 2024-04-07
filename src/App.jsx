// CSS:
import "./App.css";
import "./components/header.css";
import "./components/footer.css";
import "./pages/home.css";
import "./pages/signup.css";
import "./pages/login.css";
import "./pages/characters.css";
import "./pages/comics.css";
import "./pages/characterId.css";
import "./pages/favorites.css";

// components:
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages:
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import CharacterId from "./pages/CharactersId";
import ComicId from "./pages/ComicId";
import Favorites from "./pages/Favorites";
import Easter from "./pages/Easter";

// others:
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 10 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <>
      <Router>
        <Header token={token} handleToken={handleToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/characters" element={<Characters token={token} />} />
          <Route path="/comics" element={<Comics token={token} />} />
          <Route path="/favorites" element={<Favorites token={token} />} />
          <Route path="/comics/:characterId" element={<CharacterId />} />
          <Route path="/comic/:comicId" element={<ComicId />} />
          <Route path="/easter" element={<Easter />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
