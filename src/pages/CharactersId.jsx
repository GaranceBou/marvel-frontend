import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const CharacterId = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comics/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="white"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  ) : (
    <section className="main">
      <div className="container-id">
        <h1>{data.name}</h1>
        <div className="characterId-main">
          <img
            className="character-avatar"
            src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
            alt="avatar"
          />
          {data.description ? (
            <p>{data.description}</p>
          ) : (
            <p>No description for this character</p>
          )}
        </div>
      </div>
      <h3>COMICS FOR THIS CHARACTER</h3>
      <div className="charactersId">
        {data.comics.map((comic, index) => {
          return (
            <div key={index} className="characterId">
              <h4>{comic.title}</h4>
              <img
                className="poster"
                src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CharacterId;
