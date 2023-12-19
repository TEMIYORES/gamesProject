import { Home2, MessageNotif, TransactionMinus, User } from "iconsax-react";
import { Link } from "react-router-dom";
const MobileNavbar = () => {
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
      path: "/campaigns/puzzle/settings",
    },
    {
      title: "Referral Campaign",
      path: "/campaigns/referral-campaign/settings",
    },
  ];
  return (
    <div className="block md:hidden bg-white sticky top-0 left-0 right-0 items-start flex-col z-50">
      <h2 className="font-medium text-base bg-slate-100 py-5 pl-5">
        Create a Campaign
      </h2>
      <ul className="ml-5 flex gap-x-6 py-3 overflow-x-auto whitespace-nowrap custom-scrollbar">
        {Menus.map((menu) => {
          return (
            <Link to={menu.path} key={menu.path}>
              <li
                className={`w-full flex items-center gap-x-2 text-xs ${
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

export default MobileNavbar;
