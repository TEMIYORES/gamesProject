import { Link } from "react-router-dom";
import Container from "../Container";
const Navbar = () => {
  return (
    <div className="w-full bg-white z-30 shadow-sm">
      <div className="py-2 border-b">
        <Container>
          <div className="flex item-center justify-between gap-3 md:gap-0">
            <div className="lg:w-[23%] xl:w-[20%] flex gap-5 items-baseline">
              <Link to="/" className={`font-bold text-xl`}>
                Games logo
              </Link>

              <div className=" md:block font-bold pb-3 relative">
                <Link to="/">Campaigns</Link>
                <hr className="bg-blue-700 h-1 w-full absolute bottom-[-10px]"></hr>
              </div>
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <div>UserMenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
