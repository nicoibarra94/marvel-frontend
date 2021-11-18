import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = ({ setUser }) => {
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
          placeholder="nnibarra@uc.cl"
          onChange={handleEmail}
        ></input>
        <input
          type="password"
          placeholder="IHÑ-`23y3"
          onChange={handlePassword}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
