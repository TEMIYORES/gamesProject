import { Outlet } from "react-router";

const WithoutNavbar = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default WithoutNavbar;
