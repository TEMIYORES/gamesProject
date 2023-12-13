import { Outlet } from "react-router";
import Navbar from "./nav/Navbar";
import MobileNavbar from "./nav/MobileNavbar";
// import Footer from "./footer/Footer";

const WithNavbar = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen md:bg-slate-100">
        <Navbar />
        <MobileNavbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default WithNavbar;
