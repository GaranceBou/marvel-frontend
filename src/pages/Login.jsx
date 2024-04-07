import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        alert("Incorrect mail or password");
      }
    }
  };

  return (
    <div className="formshape">
      <h1>Login</h1>
      <form
        className="formlogin"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
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
        <div className="lpassword-input">
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
        <button type="submit" className="loginbutton">
          Login
        </button>
      </form>
      <p className="linkpages" onClick={() => navigate("/signup")}>
        No account yet ? Sign up !
      </p>
    </div>
  );
};

export default Login;
