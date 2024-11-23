import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Recommendations } from "../components/Recommendations";
import { TabBar } from "../components/TabBar";
import { Faqs } from "../components/Faqs";
import { Trending } from "../components/Trending";

export const Home = () => {
  return (
    <>
      <NavBar />
      <Header />
      <Recommendations />
      <Trending />
      <Faqs />
      <Footer />
      <TabBar />
    </>
  );
};
