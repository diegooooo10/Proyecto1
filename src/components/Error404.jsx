import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-10 bg-white dark:bg-slate-800">
      <h2 className="text-3xl text-black dark:text-white">404</h2>
      <img src="/public/this-is-fine-404.gif" alt="Gif this is not fine" className="rounded-md" />
      <Link to='/'>
      <p className="text-4xl text-black dark:text-white hover:cursor-pointer ">Click here to return to the home page :D</p>
      </Link>
    </div>
  );
};
