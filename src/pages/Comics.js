import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const userToken = Cookies.get("userToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?skip=${page}&title=${search}`
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
              <button
                onClick={async () => {
                  const response = await axios.post(
                    `http://localhost:3000/comics/addfavorite?description=${
                      comic.description
                    }&photo=${`${comic.thumbnail.path}.${comic.thumbnail.extension}`}&name=${
                      comic.title
                    }`,
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

export default Comics;
