import Container from "../Container";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
         
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>123 Chef Street, Foodie City</p>
            <p>Email: support@localchefbazaar.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>

         
          <div>
            <h3 className="text-xl font-bold mb-4">Working Hours</h3>
            <p>Mon - Fri: 9:00 AM - 10:00 PM</p>
            <p>Sat - Sun: 10:00 AM - 11:00 PM</p>
            <div className="flex justify-center md:justify-start gap-4 mt-4 text-2xl">
              <FaFacebook className="cursor-pointer hover:text-lime-500" />
              <FaInstagram className="cursor-pointer hover:text-lime-500" />
              <FaTwitter className="cursor-pointer hover:text-lime-500" />
            </div>
          </div>

         
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-gray-400">
              Connecting local home cooks with food lovers in the community.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;