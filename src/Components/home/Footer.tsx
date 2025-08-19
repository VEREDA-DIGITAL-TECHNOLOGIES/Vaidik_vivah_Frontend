import { FaFacebookF, FaInstagram } from "react-icons/fa";

// import { MdKeyboardArrowUp } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import '../../font.css';

const Footer = () => {
  const { pathname } = useLocation();
  // Determine if the footer should be hidden
  const hiddenRoutes = [
    "/verification",
    "/register",
    "/questions",
    "/login",
    "/forgot-password",
    "/discover",
    "/change-password",
    "/verification",
    "/user",
    "/register",
    "/create-password",
    "/personal",
    "/location",
    "/profile",
    "/other-details",
    "/qualification",
    "/successfully",
    "/photoupload",
    "/forgotpassword",
    "/login",
    "/verify-otp",
    "/success",
    "/Payment-Success",
    "/cancel",
    "/exclusive",
  ];
  const isHiddenRoute = hiddenRoutes.some((route) => pathname.startsWith(route));

  if (isHiddenRoute) {
    return null;
  }

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  // const currentYear = new Date().getFullYear();

  return (
    <div className="w-full h-auto bg-[#2A2A2A]">
      <div className="px-6 sm:px-14 text-white space-y-8 sm:py-16 py-10 container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="space-y-5 lg:col-span-2">
            <div className="flex items-center">
              <img
                src="/logotest3.png"
                alt="logo"
                className="h-24 w-auto md:h-24"
              />
              {/* <h1 className="text-[30px]">Vaidik Vivah</h1> */}
            </div>
            <p className="font-Proxima-Nova-Regular text-pretty font-[Bembo-MT-Pro-Light]">
              Culture is the heritage and pride of our country. In which Indian Marriage has a Different identity and is the main basis. The foundation of the Coming Generations is laid only after marriage. All traditional and system are connected to this. ( Tow people one Life) is not a story. This is the truth of two lives and this truth is strengthened further. Marriage were conducted in the Vedic manner with Ved mantras.
              Today's youth must coperate in keeping the values of this culture alive and strengthening them.
            </p>
          </div>

          {/* Mission Links */}
          <div>
            
            <ul className="font-[Bembo-MT-Pro-Regular] space-y-2">
              <li><Link to="/mission" className="hover:text-[#007EAF]">Mission</Link></li>
              <li><Link to="/advice" className="hover:text-[#007EAF]">Advice</Link></li>

              <li><Link to="/services" className="hover:text-[#007EAF]">Services</Link></li>

              <li><Link to="/help" className="hover:text-[#007EAF]">Help</Link></li>
              <li><Link to="/faqs" className="hover:text-[#007EAF]">FAQs</Link></li>
              <li><Link to="/contact-us" className="hover:text-[#007EAF]">Contact Us</Link></li>
            </ul>
          </div>

          {/* About Us Links */}
          <div>
            
            <ul className="font-[Bembo-MT-Pro-Regular] space-y-2">
              <li><Link to="/about-us" className="hover:text-[#007EAF]">About Us</Link></li>
              <li><Link to="/community-guidelines" className="hover:text-[#007EAF]">Community Guidelines</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-[#007EAF]">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#007EAF]">Privacy Policy</Link></li>
              <li><Link to="/cookies-policy" className="hover:text-[#007EAF]">Cookies Policy</Link></li>
            </ul>
          </div>

          {/* Social Links - Now appears after Mission on tablet */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-[Bembo-MT-Pro-Bold] text-lg mb-4">Social</h3>
            <div className="flex gap-5 text-2xl">
              <Link title="link" to="https://www.facebook.com/share/15NawNjVBu/" target="_blank" rel="noreferrer" className="hover:text-[#007EAF]">
                <FaFacebookF />
              </Link>

              <Link title="link" to="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=ysvejqr " target="_blank" rel="noreferrer" className="hover:text-[#007EAF]">
                <FaInstagram />
              </Link>
             
            </div>
          </div>
        </div>

        {/* Divider and Back to Top
        <div className="flex items-center justify-between pt-4">
          
          <button 
            onClick={scrollToTop} 
            className="text-white rounded-full ml-4 bg-[#007EAF] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl md:text-3xl hover:bg-[#006494] transition-colors"
            aria-label="Scroll to top"
          >
            <MdKeyboardArrowUp />
          </button>
        </div> */}

     
      </div>
      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-white/60 text-sm">
          © {new Date().getFullYear()} Ved Vivah — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;