import "./../styles/HomePage.scss"; // Importera HomePage-specifik CSS

export const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="homepage__title">Welcome to the Zoo</h1>
      <button
        className="homepage__button"
        onClick={() => (window.location.href = "/animals")}
      >
        Explore Animals
      </button>
    </div>
  );
};

export default HomePage;
