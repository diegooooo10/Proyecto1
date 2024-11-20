import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Recomenadaciones } from "../components/Recomenadaciones";
import { TabBar } from "../components/TabBar";
import { Tendencias } from "../components/Tendencias";
import { Faqs } from "../components/Faqs";

export const Home = () => {
  return (
    <>
      <NavBar />
      <Header />
      <Recomenadaciones />
      <Tendencias />
      <Faqs />
      <Footer />
      <TabBar />
    </>
  );
};
