import { Instagram, Twitter } from "../svg";

export const Footer = () => {
  return (
    <footer id="about" className="p-5 mb-5 lg:mb-0 space-y-1 text-gray-300 dark:text-gray-500 lg:h-full h-[320px]  dark:bg-slate-700">
      <h2 className="mb-3 text-xl font-bold">About Us</h2>
      <p className="font-semibold ">Inverstors</p>
      <p className="font-semibold ">Jobs</p>
      <p className="font-semibold ">Privacy Policy</p>
      <p className="font-semibold ">Terms and Conditions</p>
      <p className="font-semibold ">Platzi Travel, inc</p>
      <p className="font-semibold ">Follow Us</p>
      <div className="flex ">
        <a href="https://x.com/">
          <Twitter />
        </a>
        <a href="https://www.instagram.com/">
          <Instagram />
        </a>
      </div>
    </footer>
  );
};
