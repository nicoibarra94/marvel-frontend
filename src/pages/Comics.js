import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("a");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics/${page}/${search}`
        );
        setData(response.data);
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
        {data.data.map((comic, index) => {
          return (
            <div key={comic._id} className="character-box">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt=""
              />
              <h1>{comic.title}</h1>
              <p>{comic.description}</p>
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

export default Comics;
