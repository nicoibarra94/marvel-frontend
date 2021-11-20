import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Favorites = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const userToken = Cookies.get("userToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/favorites",
          {},
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userToken]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>Favorites Comics</h1>
      <div>
        {data.comics.map((comic, index) => {
          return (
            <div>
              <h1>{comic.name}</h1>
              <img src={comic.photo} alt="" />
              <p>{comic.description}</p>
            </div>
          );
        })}
      </div>
      <h1>Favorites personnages</h1>
      <div>
        {data.characters.map((character, index) => {
          return (
            <div>
              <h1>{character.name}</h1>
              <img src={character.photo} alt="" />
              <p>{character.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
