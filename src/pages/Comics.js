import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comics");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading === true ? (
    <p>Loading...</p>
  ) : (
    <div>
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
  );
};

export default Comics;
