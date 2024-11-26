import { useContext } from "react";
import { Dark, SearchTabBar, UserTabBar } from "../svg";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

export const NavBar = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="fixed z-10 items-center justify-between hidden w-full h-auto p-5 bg-white dark:bg-slate-800 lg:flex text-tertiary">
      <h1 className="text-xl font-bold dark:text-white hover:cursor-pointer">
        <ScrollLink to="search" smooth={true} duration={500}>
          Plazti Travel
        </ScrollLink>
      </h1>
      <ul className="flex text-lg font-bold space-x-7 dark:text-white ">
        <li>
          <ScrollLink
            to="recomendation"
            className="hover:cursor-pointer"
            smooth={true}
            duration={500}
            offset={-70}
          >
            Location
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="trending"
            className="hover:cursor-pointer"
            smooth={true}
            duration={500}
            offset={-70}
          >
            Stays
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="faqs"
            className="hover:cursor-pointer"
            smooth={true}
            duration={500}
            offset={-70}
          >
            FAQs
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="about"
            className="hover:cursor-pointer"
            smooth={true}
            duration={500}
            offset={-70}
          >
            About Us
          </ScrollLink>
        </li>
      </ul>
      <ul className="flex items-center space-x-6">
        <Link  to='/places'>
          <SearchTabBar />
        </Link>
        <button onClick={handleToggle}>
          <Dark />
        </button>
        <Link to="/account">
          <UserTabBar />
        </Link>
      </ul>
    </nav>
  );
};
