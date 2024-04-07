import deadpool from "../assets/deadpool.webp";

const Easter = () => {
  return (
    <div
      style={{
        margin: "60px auto",
        maxWidth: "1150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        className="easterimg"
        src={deadpool}
        alt="hola"
        style={{ maxWidth: "600px" }}
      />
    </div>
  );
};

export default Easter;
