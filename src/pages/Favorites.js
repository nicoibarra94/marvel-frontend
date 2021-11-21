import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import Cookies from "js-cookie";
import M from "../images/m-marvel.png";

const Favorites = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const userToken = Cookies.get("userToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://marvel-backend-ibarra.herokuapp.com/favorites",
          {},
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        console.log(response);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userToken]);

  return token ? (
    isLoading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <div className="title-character-comics">
          <h1> My Favorites Comics</h1>
          <img src={M} alt="" />
        </div>
        {data.comics.length === 0 && (
          <div className="empty-list-box">
            <p className="empty-list">
              Your list of Favorites Comics is empty...
            </p>
          </div>
        )}
        <div>
          {data.comics.map((comic, index) => {
            return (
              <div key={comic.id} className="character-comics">
                <img src={comic.photo} alt="" />
                <div className="character-comics-texts">
                  <h1>{comic.name}</h1>
                  <p>{comic.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="title-character-comics">
          <h1> My Favorites Characters</h1>
          <img src={M} alt="" />
        </div>
        {data.characters.length === 0 && (
          <div className="empty-list-box">
            <p className="empty-list">
              Your list of Favorites Comics is empty...
            </p>
          </div>
        )}
        <div className="character-container">
          {data.characters.map((character, index) => {
            return (
              <div className="character-box">
                <img id="favorite-image" src={character.photo} alt="" />
                <div className="black-box-characters">
                  <h1>{character.name}</h1>
                  {/* <p>{character.description}</p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorites;
