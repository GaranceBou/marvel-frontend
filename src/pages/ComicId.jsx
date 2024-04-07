import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const ComicId = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { comicId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comic/${comicId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [comicId]);

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
        <h1>{data.title}</h1>
        <div className="characterId-main">
          <img
            className="character-avatar"
            src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
            alt="avatar"
          />
          {data.description ? (
            <p>{data.description}</p>
          ) : (
            <p>No description for this comic</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ComicId;
