import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import M from "../images/m-marvel.png";

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
      <div className="comic-list-image">
        <p>The Marvel Comics</p>
        <input
          type="text"
          placeholder="Looking for an specific title?  Try here..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="character-container">
        {data.data.map((comic, index) => {
          return (
            <div key={comic._id} className="character-comics">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt=""
              />
              <div className="comics-container">
                <div className="character-comics-texts">
                  <h1>{comic.title}</h1>
                  <p>{comic.description}</p>
                </div>
                <button
                  onClick={async () => {
                    const response = await axios.post(
                      `http://localhost:3000/comics/addfavorite/?photo=${`${comic.thumbnail.path}.${comic.thumbnail.extension}`}&id=${
                        comic._id
                      }&description=${comic.description}&&name=${comic.title}`,
                      {},
                      {
                        headers: {
                          Authorization: "Bearer " + userToken,
                        },
                      }
                    );
                    console.log(response);
                    if (response.data.error) {
                      alert(response.data.error);
                    } else {
                      alert("Added to your favorite list!");
                    }
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

export default Comics;
