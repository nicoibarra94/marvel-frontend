import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

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
  };

  const handleClickPrevious = async () => {
    setPage(page - 1);
  };

  return isLoading === true ? (
    <p>Loading...</p>
  ) : (
    <div>
      <input
        type="text"
        placeholder="Cherche un comic"
        onChange={(event) => setSearch(event.target.value)}
      />

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
              <p>{character.name}</p>
              <p>{character.description}</p>
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
          );
        })}
      </div>
      {page !== 1 && (
        <button onClick={handleClickPrevious}>Previous Page</button>
      )}
      <span>Page: {page} of 17</span>
      <button onClick={handleClickNext}>Next Page</button>
    </div>
  );
};

export default Personnages;
