import Logo from "../images/Marvel_Logo.svg.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  const userToken = Cookies.get("userToken");

  return (
    <div className="header">
      <div className="top-header">
        <button onClick={() => navigate("/signup")}>Join</button>
        <img src={Logo} alt="" onClick={() => navigate("/")} />
        {token ? (
          <button onClick={() => setUser()}>Dissconect</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
      <div className="bottom-header">
        <button onClick={() => navigate("/")}> Personnnages</button>
        <button onClick={() => navigate("/comics")}> Comics </button>
        <button onClick={() => navigate("/favorites")}> Favoris </button>
      </div>
    </div>
  );
};

export default Header;
