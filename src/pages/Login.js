import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div className="login-box">
      <h1>Login </h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://marvel-backend-ibarra.herokuapp.com/user/login",
              {
                email: email,
                password: password,
              }
            );
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
        <p>Email</p>
        <input
          type="email"
          placeholder="Enter your email "
          value={email}
          onChange={handleEmail}
        />
        <p>Password</p>
        <input
          type="password"
          placeholder="Enter your password "
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Enter</button>
      </form>
      <Link className="link-to-signup" to="/signup">
        You don't have an account yet? ¡Click here!
      </Link>
    </div>
  );
};

export default Login;
