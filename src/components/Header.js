import Logo from "../images/Marvel_Logo.svg.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <img src={Logo} alt="" onClick={() => navigate("/")} />
      <button onClick={() => navigate("/")}> Personnnages</button>
      <button onClick={() => navigate("/comics")}> Comics </button>
      <button> Favoris </button>
    </div>
  );
};

export default Header;
