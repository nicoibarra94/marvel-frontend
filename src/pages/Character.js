import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import M from "../images/m-marvel.png";

const Character = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics/${id}`);
        setData(response.data.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading === true ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="title-character-comics">
        <h1>Featured Comics</h1>
        <img src={M} alt="" />
      </div>
      {data.comics.map((comic, index) => {
        return (
          <div className="character-comics" key={comic._id}>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt=""
            />
            <div className="character-comics-texts">
              <h1>{comic.title}</h1>
              <p>{comic.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Character;
