import logo from "../../../../public/FlowTech-Logo.png";
import { FaFacebookF, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
   return (
      <footer className="footer footer-center p-10 gap-4 bg-ourBlack text-white">
         <aside>
            <img className="size-20" src={logo} alt="" />
            <h3 className=" uppercase tracking-[2px] text-xl">
               <span className="text-ourPrimary">FLOWTECH </span>- Digital
               Agency Solutions
            </h3>
            <p className="">
               Copyright © {new Date().getFullYear()} - All right reserved
            </p>
            <p className="">
               Website by{" "}
               <strong>
                  <a
                     className="text-ourPrimary font-bold"
                     href="https://www.facebook.com/NoorTusharKhan/"
                  >
                     Noor Tushar Khan
                  </a>
               </strong>
            </p>
         </aside>
         <nav>
            <div className="grid grid-flow-col gap-4">
               {/* facebook */}
               <a
                  href="https://www.facebook.com/NoorTusharKhan/"
                  target="_blank"
                  className="size-11 border-[0.1px] border-ourPrimary bg-opacity-80 rounded-full flex justify-center items-center bg-ourOrange cursor-pointer duration-300 hover:bg-ourPrimary hover:border-ourPrimary group"
               >
                  <FaFacebookF className=" text-white  text-sm"></FaFacebookF>
               </a>

               {/* linkedin */}
               <a
                  href="https://www.linkedin.com/in/noortushar/"
                  target="_blank"
                  className="size-11 border-[0.1px] border-ourPrimary bg-opacity-80 rounded-full flex justify-center items-center bg-ourOrange cursor-pointer duration-300 hover:bg-ourPrimary hover:border-ourPrimary group"
               >
                  <FaLinkedin className="text-white text-lg"></FaLinkedin>
               </a>

               {/* github */}
               <a
                  href="https://github.com/NoorTushar"
                  target="_blank"
                  className="size-11 border-[0.1px] border-ourPrimary bg-opacity-80 rounded-full flex justify-center items-center bg-ourOrange cursor-pointer duration-300 hover:bg-ourPrimary hover:border-ourPrimary group"
               >
                  <FaGithub className="text-white text-lg"></FaGithub>
               </a>

               {/* twitter */}
               <a
                  href="https://twitter.com/NoorTusharKhan"
                  target="_blank"
                  className="size-11 border-[0.1px] border-ourPrimary bg-opacity-80 rounded-full flex justify-center items-center bg-ourOrange cursor-pointer duration-300 hover:bg-ourPrimary hover:border-ourPrimary group"
               >
                  <FaXTwitter className="text-white text-base"></FaXTwitter>
               </a>
            </div>
         </nav>
      </footer>
   );
};

export default Footer;
