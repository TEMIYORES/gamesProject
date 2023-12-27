import { Link } from "react-router-dom";
const GameSidebar = () => {
  return (
    <div className="w-full flex gap-5 border border-black place-items-center py-2 pl-2 text-[#5E17EB]">
      <Link to={"/entry"}>
        <h2
          className={`font-bold pb-1 ${
            window.location.pathname === "/entry"
              ? "border-b border-[#5E17EB]"
              : null
          }`}
        >
          Entry
        </h2>
      </Link>
      <Link to={"/game"}>
        <h2
          className={`font-bold pb-1 ${
            window.location.pathname === "/game"
              ? "border-b border-[#5E17EB]"
              : null
          }`}
        >
          Game
        </h2>
      </Link>
      <Link to={"/redirect"}>
        <h2
          className={`font-bold pb-1 ${
            window.location.pathname === "/redirect"
              ? "border-b border-[#5E17EB]"
              : null
          }`}
        >
          Redirect
        </h2>
      </Link>
    </div>
  );
};

export default GameSidebar;
