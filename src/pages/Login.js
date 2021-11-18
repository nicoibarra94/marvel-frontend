import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h1>Se connecter</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "http://localhost:3000/user/login",
              {
                email: email,
                password: password,
              }
            );
            console.log(response);
            if (response.data.Error) {
              alert(response.data.Error);
            } else {
              setUser(response.data.token);
              navigate("/");
            }
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <input
          type="email"
          placeholder="Enter your email "
          value={email}
          onChange={handleEmail}
        />
        <input
          type="password"
          placeholder="Enter your password "
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
