import starlord from "../assets/Star-Lord.webp";
import spiderman from "../assets/test.jpg";
import ironman from "../assets/ironman.jpg";

const Home = () => {
  return (
    <section className="home-section">
      <div className="home">
        <img className="spiderman" src={spiderman} alt="spiderman" />
        <img className="ironman" src={ironman} alt="ironman" />
        <img className="starlord" src={starlord} alt="starlord" />
      </div>
    </section>
  );
};

export default Home;
