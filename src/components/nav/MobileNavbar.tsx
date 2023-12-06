import {
  Home2,
  LogoutCurve,
  MessageNotif,
  TransactionMinus,
  User,
} from "iconsax-react";
import { Link } from "react-router-dom";
const MobileNavbar = () => {
  const Menus = [
    {
      title: "Spin the wheel",
      path: "/campaigns/spin-the-wheel",
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
      path: "/campaigns/scratch-card",
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
      path: "/campaigns/quiz",
      icon: (
        <MessageNotif
          size="30"
          variant={window.location.pathname === "/supports" ? "Bold" : "Linear"}
        />
      ),
    },
    {
      title: "Code give away",
      path: "/campaigns/code-give-away",
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
    <div className="hidden bg-white sticky top-0 left-0 right-0 items-start p-6 pr-10 flex-col">
      <h2 className="font-bold mb-5">Create a Campaign</h2>
      <ul className="ml-5 flex gap-x-6">
        {Menus.map((menu) => {
          return (
            <Link to={menu.path} key={menu.path}>
              <li
                className={`flex items-center gap-x-2 text-sm ${
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

export default MobileNavbar;
