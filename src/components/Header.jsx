import logo from "../assets/Marvel_Logo.svg";
import web from "../assets/web.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="header">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <div className="links">
          <Link to="/characters">
            <button className="header-button">CHARACTERS </button>
          </Link>
          <Link to="/comics">
            <button className="header-button">COMICS</button>
          </Link>
          {token && (
            <Link to="/favorites">
              <button className="header-button">FAVORITES</button>
            </Link>
          )}
        </div>
        <div className="header-left">
          <Link to="/easter">
            <img className="web" src={web} alt="web" />
          </Link>
          {token ? (
            <button
              className="disconnect"
              onClick={() => {
                handleToken(null);
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to="/login">
                <button className="login-button">LOGIN</button>
              </Link>
              <Link to="/signup">
                <button className="login-button">SIGNUP</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
