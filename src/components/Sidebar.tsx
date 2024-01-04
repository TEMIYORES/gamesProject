import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="hidden md:flex w-[25%] lg:w-[30%] xl:w-[25%] bg-white sticky top-0 bottom-0 left-0 h-[100vh] flex-col items-start p-6 pr-10">
      <h2 className="font-bold mb-5">Create a Campaign</h2>
      <ul className="ml-5 flex flex-col gap-y-6">
        <Link to={"/"}>
          <li
            className={`flex items-center gap-x-2 text-xs ${
              window.location.pathname === "/" ? "font-semibold" : null
            }`}
          >
            Games
          </li>
        </Link>
      </ul>
      <h2 className="font-bold mb-5 mt-10">Your Campaigns</h2>
      <ul className="ml-5 flex flex-col gap-y-6">
        <Link to={"/your-games"}>
          <li
            className={`flex items-center gap-x-2 text-xs ${
              window.location.pathname === "/your-games" ? "font-semibold" : null
            }`}
          >
            Your Games
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
