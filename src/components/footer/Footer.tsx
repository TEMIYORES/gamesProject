import Container from "../Container";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import FooterList from "./FooterList";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col sm:flex-row flex-wrap justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link to="#">Phones</Link>
            <Link to="#">Laptops</Link>
            <Link to="#">Desktops</Link>
            <Link to="#">Watches</Link>
            <Link to="#">TVs</Link>
            <Link to="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link to="#">Contact Us</Link>
            <Link to="#">Shipping Policy</Link>
            <Link to="#">Returns & Exchanges</Link>
            <Link to="#">Terms of Use</Link>
            <Link to="#">FAQs</Link>
          </FooterList>
          <div className=" flex flex-col gap-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6 ">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              voluptates cupiditate totam reiciendis libero laudantium.
              Necessitatibus ipsam quisquam maxime molestias expedita, pariatur
              ut optio accusantium natus provident.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Blox Merch. All rights reserved.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link to="#">
                <MdFacebook size={24} />
              </Link>
              <Link to="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link to="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link to="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
