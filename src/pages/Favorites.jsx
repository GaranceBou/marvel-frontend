import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const Favorites = ({ token }) => {
  const [dataChar, setDataChar] = useState([]);
  const [dataCom, setDataCom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/favorites/character`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setDataChar(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/favorites/comic`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setDataCom(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

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
    <div className="favorites">
      <p>Favorite characters :</p>
      {dataChar.map((data, index) => {
        return <h6 key={index}>- {data.name}</h6>;
      })}
      <p>Favorite comics :</p>
      {dataCom.map((data, index) => {
        return <h6 key={index}>- {data.title}</h6>;
      })}
    </div>
  );
};

export default Favorites;
