import { useContext } from "react";
//useState useMemo
import { Dark } from "../svg";
import { DarkModeContext } from "../context/DarkModeContext";
import { Link } from "react-router-dom";
/* import allPlaces from "../mocks/all-places.json"; */

export const Header = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
/*   const [search, setSearch] = useState(""); */

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
/*   const filteredRecomendaciones = useMemo(() => {
    if (!search) {
      return[];
    }

    return allPlaces.filter((place) =>
      place.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const searcher = (e) => {
    setSearch(e.target.value);
  }; */
  return (
    <header
      id="search"
      className="flex flex-col items-center justify-center w-full h-auto lg:h-[700px] p-5 text-center bg-cover bg-sanFranciscoHeader"
    >
      <div className="flex flex-col items-end w-full mb-96 lg:mb-0">
        <button onClick={handleToggle} className="fixed mb-5 lg:hidden ">
          <Dark />
        </button>
        <input
/*           value={search}
          onChange={searcher} */
          type="text"
          name="search"
          id="search"
          placeholder="San Francisco"
          className="w-11/12 h-auto p-3 mx-auto mt-16 bg-white rounded-full shadow outline-none lg:hidden focus:ring-0"
        />
{/*         {filteredRecomendaciones.length > 0 && (
          <div className="absolute z-20 w-11/12 mt-1 overflow-y-auto bg-white rounded-md shadow-lg max-h-60">
            {filteredRecomendaciones.map((place) => (
              <select
                key={place.id}
                className="p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600"
              >

                  <option value={place.title} className="text-lg font-semibold text-gray-900 dark:text-white">
                    {place.title}
                  </option>

              </select>
            ))}
          </div>
        )} 

        {filteredRecomendaciones.length === 0 && search && (
          <p className="text-lg text-center text-black dark:text-white">
            No hay lugares disponibles
          </p>
        )}
          */}
      </div>
      <div className="absolute hidden mb-40 text-left w-96 lg:left-20 lg:flex">
        <h2 className="text-4xl font-bold text-white dark:text-white">
          Find More Locations like this
        </h2>
      </div>
      <div className="w-full mb-10 lg:mb-7 ">
        <Link to="/places">
          <button className="w-48 text-lg font-semibold bg-white rounded-full lg:absolute lg:left-20 lg:w-48 h-14 text-tertiary dark:text-black">
            Explore More
          </button>
        </Link>
      </div>
    </header>
  );
};
