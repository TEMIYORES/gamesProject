import {
  Home2,
  LogoutCurve,
  MessageNotif,
  TransactionMinus,
  User,
} from "iconsax-react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const Menus = [
    {
      title: "Spin the wheel",
      path: "/campaigns/spin-the-wheel/settings",
      icon: (
        <Home2
          size="30"
          variant={
            window.location.pathname === "/dashboard" ? "Bold" : "Linear"
          }
        />
      ),
    },
    {
      title: "Scratch Card",
      path: "/campaigns/scratch-card/settings",
      icon: (
        <TransactionMinus
          size="30"
          variant={
            window.location.pathname === "/transactions" ? "Bold" : "Linear"
          }
        />
      ),
    },
    {
      title: "Quiz",
      path: "/campaigns/quiz/settings",
      icon: (
        <MessageNotif
          size="30"
          variant={window.location.pathname === "/supports" ? "Bold" : "Linear"}
        />
      ),
    },
    {
      title: "Code give away",
      path: "/campaigns/code-give-away/settings",
      icon: (
        <User
          size="30"
          variant={window.location.pathname === "/account" ? "Bold" : "Linear"}
        />
      ),
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
  return (
    <div className="hidden md:flex w-[25%] lg:w-[30%] xl:w-[25%] bg-white sticky top-0 bottom-0 left-0 h-[100vh] flex-col items-start p-6 pr-10">
      <h2 className="font-bold mb-5">Create a Campaign</h2>
      <ul className="ml-5 flex flex-col gap-y-6">
        {Menus.map((menu) => {
          return (
            <Link to={menu.path} key={menu.path}>
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
      <ul className="text-white h-[10%]">
        <li className="flex items-center gap-x-2 text-xl">
          <LogoutCurve size="30" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
