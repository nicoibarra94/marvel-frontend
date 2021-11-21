import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Signup = ({ setUser, token }) => {
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
    <div className="signup-box">
      <h1>Sign Up</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "http://localhost:3000/user/signup",
              {
                password: password,
                email: email,
              }
            );
            if (response.data.Error) {
              alert(response.data.Error);
            } else {
              setUser(response.data.newUser.token);
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
          placeholder="IWannaBeaHeroMyself@marvel.fr"
          onChange={handleEmail}
        ></input>
        <p>Password</p>
        <input
          type="password"
          placeholder="IHÑ-`23y3dkdk1"
          onChange={handlePassword}
        ></input>
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default Signup;
