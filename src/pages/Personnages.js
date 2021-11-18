import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Personnages = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters/${page}`
        );
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page]);

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
      <div className="character-container">
        {data.results.map((character, index) => {
          const id = character._id;
          return (
            <Link
              to={`/character/${id}`}
              className="character-box"
              key={character._id}
            >
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt=""
              />
              <p>{character.name}</p>
              <p>{character.description}</p>
            </Link>
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
