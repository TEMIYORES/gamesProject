import { Link } from "react-router-dom";
import GameSidebar from "../../components/GameSidebar";
import { useDispatch } from "react-redux";
import { setGameType } from "../../slices/gameType";
const Entry = () => {
  const Menus = [
    {
      title: "Spin the wheel",
      path: "/campaigns/spin-the-wheel/settings",
    },
    {
      title: "Scratch Card",
      path: "/campaigns/scratch-card/settings",
    },
    {
      title: "Quiz",
      path: "/campaigns/quiz/settings",
    },
    {
      title: "Code give away",
      path: "/campaigns/code-give-away/settings",
    },
    {
      title: "Puzzle",
      path: "/campaigns/puzzle",
    },
    {
      title: "Referral Campaign",
      path: "/campaigns/referral-campaign",
    },
  ];
  const dispatch = useDispatch();
  const handleDispatch = (name: string) => {
    dispatch(setGameType(name));
  };
  return (
    <div className="hidden md:flex w-[25%] lg:w-[30%] xl:w-[25%] bg-white sticky top-0 bottom-0 left-0 h-[100vh] flex-col items-start border border-black">
      <GameSidebar />
      <ul className="ml-5 flex flex-col gap-y-6 pt-10">
        {Menus.map((menu) => {
          return (
            <Link
              to={"/game"}
              key={menu.path}
              onClick={() => handleDispatch(menu.title)}
            >
              <li
                className={`flex items-center gap-x-2 text-xs ${
                  window.location.pathname === menu.path ? "font-bold" : null
                }`}
              >
                {menu.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Entry;
