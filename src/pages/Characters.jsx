import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ token }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/characters?name=${search}&limit=${limit}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
        setTotal(response.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, limit, skip]);

  const handlePageClick = (event) => {
    const newSkip = Math.ceil(event.selected * limit) % total;
    setSkip(newSkip);
  };
  const totalPages = Math.ceil(total / limit);

  const handleAddFavChar = async (character) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/favorites/character`,
        {
          id: character._id,
          name: character.name,
          description: character.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      alert("Added to favorites !");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        alert("Already added !");
      }
    }
  };

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
    <div>
      <section className="main">
        <h1>CHARACTERS</h1>
        <input
          className="search-input"
          type="text"
          placeholder="looking for something ?"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <div className="characters">
          {data.results.map((result, index) => {
            return (
              <div className="character" key={index}>
                <Link to={`/comics/${result._id}`}>
                  <h4>{result.name}</h4>
                </Link>
                <Link to={`/comics/${result._id}`}>
                  <img
                    className="avatar"
                    src={`${result.thumbnail.path}/portrait_uncanny.${result.thumbnail.extension}`}
                    alt="avatar"
                  />
                </Link>
                {token && (
                  <FontAwesomeIcon
                    className="heart"
                    icon="heart"
                    onClick={() => {
                      handleAddFavChar(result);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>
      <div>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="previous"
          renderOnZerototalPages={null}
          initialPage={""}
          activeClassName="actualPage"
        />
      </div>
    </div>
  );
};

export default Characters;
