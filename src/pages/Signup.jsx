import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = ({ handleToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password.length > 8) {
        setErrorMessage("");
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/signup`,
          {
            username: username,
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        handleToken(response.data.token);
        alert("You are now an Avenger !");
        navigate("/");
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 409) {
        setErrorMessage("Un compte est déjà relié à cette adresse mail");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Tous les champs doivent être remplis");
      }
    }
  };

  return (
    <>
      <div className="formshape">
        <h1>Sign Up</h1>
        <form
          className="formsignup"
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <input
            value={username}
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <div className="divider"></div>
          <input
            value={email}
            type="email"
            placeholder="Mail"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="divider"></div>
          <div className="password-input">
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FontAwesomeIcon
              className="eye"
              icon={showPassword ? "eye-slash" : "eye"}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <div className="divider"></div>
          <button className="signupbutton" type="submit" value="Submit">
            Sign up
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {showError === true && (
            <p style={{ color: "red" }}>
              Your password must be at least 8 characters long.
            </p>
          )}
        </form>
        <p onClick={() => navigate("/login")} className="linkpages">
          Already have an account ? Login !
        </p>
      </div>
    </>
  );
};

export default Signup;
