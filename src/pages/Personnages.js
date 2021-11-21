import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import M from "../images/m-marvel.png";

const Personnages = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const userToken = Cookies.get("userToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?skip=${page}&title=${search}`
        );
        console.log(response);
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, search]);

  const handleClickNext = async () => {
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClickPrevious = async () => {
    setPage(page - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isLoading === true ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="characters-image">
        <p> The Marvel Characters</p>

        <input
          type="text"
          placeholder="Look for your favorite characters"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="character-container">
        {data.results.map((character, index) => {
          const id = character._id;
          return (
            <div className="character-box" key={character._id}>
              <Link to={`/character/${id}`}>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt=""
                />
              </Link>
              <div className="black-box-characters">
                <h1>{character.name}</h1>
                {/* <p>{character.description}</p> */}
                <button
                  onClick={async () => {
                    const response = await axios.post(
                      `http://localhost:3000/characters/addfavorite?name=${
                        character.name
                      }&description=${
                        character.description
                      }&photo=${`${character.thumbnail.path}.${character.thumbnail.extension}`}`,
                      {},
                      {
                        headers: {
                          Authorization: "Bearer " + userToken,
                        },
                      }
                    );
                  }}
                >
                  Add to favorites
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="page-buttons">
        <img src={M} />
        {page !== 1 && (
          <button onClick={handleClickPrevious}>Previous Page</button>
        )}
        <span>Page: {page} of 17</span>
        <button onClick={handleClickNext}>Next Page</button>
      </div>
    </div>
  );
};

export default Personnages;
