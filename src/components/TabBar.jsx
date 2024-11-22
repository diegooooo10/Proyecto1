import { Link as ScrollLink } from "react-scroll";
import { HeartTabBar, HomeTabBar, SearchTabBar, UserTabBar } from "../svg";
import { Link } from "react-router-dom";

export const TabBar = () => {
  return (
    <nav className="fixed bottom-0 flex justify-center w-full p-5 space-x-10 bg-white border-t-2 border-white dark:border-slate-800 dark:bg-slate-800 lg:hidden">
      <ScrollLink
        to="recomendation"
        className="hover:cursor-pointer"
        smooth={true}
        duration={500}
        offset={0}
      >
        <button>
          <HomeTabBar />
        </button>
      </ScrollLink>

      <ScrollLink
        to="search"
        className="hover:cursor-pointer"
        smooth={true}
        duration={500}
        offset={0}
      >
        <SearchTabBar />
      </ScrollLink>

      <ScrollLink
        to="trending"
        className="hover:cursor-pointer"
        smooth={true}
        duration={500}
        offset={0}
      >
        <button>
          <HeartTabBar />
        </button>
      </ScrollLink>

      <Link to="/login">
        <UserTabBar />
      </Link>
    </nav>
  );
};
