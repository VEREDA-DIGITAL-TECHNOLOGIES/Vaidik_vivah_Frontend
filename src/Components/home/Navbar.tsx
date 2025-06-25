
import { RiCloseLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../model/Login";

const Navbar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const isBlueBgRoute = [
    "/mission", "/advice", "/help", "/legal", "/security", "/faqs", "/contact-us",
    "/cookies-policy", "/community-guidelines", "/privacy-policy", "/terms-conditions",
    "/child-safety-policy", "/about-us", "/plan", "/services", "/subscription-tiers", "/delete-account"
  ].includes(pathname);

  const hiddenRoutes = [
    "/verification", "/register", "/questions", "/login", "/forgot-password", "/create-password",
    "/change-password", "/other-details", "/personal-details", "/test", "/qualification-details",
    "/location-details", "/photoupload", "/user-dashboard", "/verify-otp", "/profile",
    "/success", "/Payment-Success", "/cancel", "/exclusive",
  ];

  const isHiddenRoute = hiddenRoutes.some((route) => pathname.startsWith(route));
  if (isHiddenRoute) return null;

  return (
    <>
      <header
        className={`absolute navbar z-50 w-full h-auto  text-white ${isBlueBgRoute ? "bg-[#9e2727] h-5" : " "
             }`}
      >
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logotest3.png"
              alt="logo"
              className="h-24 w-auto md:h-24 ml-3"
            />
          </Link>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4 font-[Bembo-MT-Pro-Regular]">
            <Link to="/questions">
              <button className="text-white bg-[#FD5C90]  px-6 py-2 rounded-full  cursor-pointer transition">
                Register
              </button>
            </Link>
            
              <button onClick={() => setModalOpen(true)}
              className="text-white bg-[#FD5C90]  px-6 py-2 rounded-full cursor-pointer transition">
                Login
              </button>
           
          </div>

          {/* Hamburger */}
          <button title="hamburger" className="md:hidden text-white text-3xl cursor-pointer" onClick={toggleSidebar}>
            <GiHamburgerMenu />
          </button>
          <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </nav>

        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-[#9e2727] z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-6 border-b border-white">
            <img src="/logotest3.png" alt="logo" className="h-16 w-auto" />
            <button title="button" className="text-white text-3xl ml-0 cursor-pointer" onClick={toggleSidebar}>
              <RiCloseLine />
            </button>
          </div>
          <ul className="flex flex-col p-4 space-y-3 text-white text-lg font-[Bembo-MT-Pro-Regular]">
            <li><Link to="/mission" onClick={toggleSidebar}>Mission</Link></li>
            <li><Link to="/advice" onClick={toggleSidebar}>Advice</Link></li>
            <li><Link to="/help" onClick={toggleSidebar}>Help</Link></li>
            <li><Link to="/services" onClick={toggleSidebar}>Services</Link></li>
            <li><Link to="/subscription-tiers" onClick={toggleSidebar}>Subscription Tiers</Link></li>
            <li><Link to="/faqs" onClick={toggleSidebar}>FAQs</Link></li>
            <li><Link to="/contact-us" onClick={toggleSidebar}>Contact Us</Link></li>
            <li><Link to="/register" onClick={toggleSidebar}>Register</Link></li>
            <li><Link to="/login" onClick={toggleSidebar}>Login</Link></li>
          </ul>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          ></div>
        )}
      </header>
    </>
  );
};

export default Navbar;



















// import {  RiCloseLine } from "react-icons/ri";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Link, useLocation } from "react-router-dom";

// import { useState } from "react";
// // import Login from "../model/Login";
// // import { useSelector } from "react-redux";
// // import { RootState } from "../../Redux/store";

// const Navbar: React.FC = () => {
//   // const { accessToken } = useSelector((state: RootState) => state.userReducer);

//   const location = useLocation(); // Use useLocation to get the current path
//   const pathname = location.pathname;

//   // const [isLoginOpen, setLoginOpen] = useState(false);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   // const openLogin = () => setLoginOpen(true);
//   // const closeLogin = () => setLoginOpen(false);
//   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

//   const isBlueBgRoute = [
//     "/mission",
//     "/advice",
//     "/help",
//     "/legal",
//     "/security",
//     "/faqs",
//     "/contact-us",
//     "/cookies-policy",
//     "/community-guidelines",
//     "/privacy-policy",
//     "/terms-conditions",
//     "/child-safety-policy",
//     "/about-us",
//     "/plan",
//     "/services",
//     "/subscription-tiers",
//     "/delete-account"

//   ].includes(pathname);

//   const hiddenRoutes = [
//     "/verification",
//     "/register",
//     "/questions",
//     "/login",
//     "/forgot-password",
//     "/create-password",
//     "/change-password",
//     "/other-details",
//     "/personal-details",
//     "/test",
//     "/qualification-details",
//     "/location-details",
//     "/photoupload",
//     "/user-dashboard",
//     "/verify-otp",
//     "/profile",
//     "/success",
//     "/Payment-Success",
//     "/cancel",
//     "/exclusive",
//   ];

//   const isHiddenRoute = hiddenRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (isHiddenRoute) {
//     return null;
//   }

//   return (
//     <>
//       <div
//         className={`absolute navbar z-50 w-full h-auto  text-white ${isBlueBgRoute ? "bg-[#9e2727] h-5" : " "
//           }`}
//       >
//         <div className={`${isBlueBgRoute ? " " : " bg-[#9e2727] "}`}></div>
//         <div className="flex justify-between items-center container w-full ">
//           <div className="flex items-center justify-between w-full">
//             <div className="text-white  md:flex flex-1 pt-10 lg:pt-0  justify-start ml-0 ">
//               <ul className="flex gap-5 text-[22px] font-Proxima-Nova-SemiBold ">
                
//                  <Link to={"/"}>
//                   <img
//                     src="/logotest.png"
//                     alt="logo"
//                     className="w-[12rem] h-[10rem] xl:w-[18rem] xl:h-[10rem]"
//                   />
//                   {/* <h1 className="text-white text-[30px]">Vaidik Vivah</h1> */} 
//                 </Link> 
//               </ul>
//             </div>
//             <div className="flex justify-center ">
//               {/* <Link to={"/"}>
//                 <img
//                     src="/logotest.png"
//                     alt="logo"
//                     className="w-[20rem] h-[15rem] xl:w-[25rem] xl:h-[12rem]"
//                   />
//               </Link> */}
//             </div>
//             <div className="flex gap-5 items-center justify-end flex-1 pt-2">
//               <button
//                 className="flex items-center justify-center md:gap-3 md:text-[18px] text-[white] bg-[#9e2727] md:rounded-full rounded-3xl  font-bold  md:w-[130px] md:h-[50px] px-3">
//                 Register
//               </button>
              
//                 <button
                  
                
                  
//                 className="flex items-center justify-center md:gap-3 md:text-[18px] text-[white] bg-[#9e2727] md:rounded-full rounded-3xl  font-bold  md:w-[130px] md:h-[50px] px-3"
//                   > Login
//                 </button>
              
              
              
//               <button title="button" className="md:hidden text-3xl" onClick={toggleSidebar}>
//                 <GiHamburgerMenu />
//               </button>
//             </div>
//           </div>
//           {/* <Login  /> */}
//         </div>

//         <div
//           className={`fixed top-0 left-0 h-full w-64 bg-[#9e2727] z-20 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//             } transition-transform duration-300 ease-in-out`}
//         >
//           <div className="flex justify-between items-center p-4">
//             <Link to={"/"}>
//               <img src="/logotest.png" alt="logo" className="w-[12rem] h-[10rem] xl:w-[18rem] xl:h-[10rem]" />
//             </Link>
//             <button className="text-3xl text-white" onClick={toggleSidebar}>
//               <RiCloseLine />
//             </button>
//           </div>
//           <nav className="flex flex-col p-4 text-[20px] items-center">
//             <Link
//               to="/mission"
//               className="py-1 text-white"
//               onClick={toggleSidebar}
//             >
//               Mission
//             </Link>
//             <Link
//               to="/advice"
//               className="py-1 text-white"
//               onClick={toggleSidebar}
//             >
//               Advice
//             </Link>
//             <Link
//               to="/help"
//               className="py-1 text-white"
//               onClick={toggleSidebar}
//             >
//               Help
//             </Link>


//             <Link to="/services" className="py-1 text-white"
//               onClick={toggleSidebar}>Services</Link>


//             <Link to="/subscription-tiers" className="py-1 text-white"
//               onClick={toggleSidebar}>Subscription Tiers</Link>


//             <Link to="/faqs" className="py-1 text-white"
//               onClick={toggleSidebar}>FAQs</Link>


//             <Link to="/contact-us" className="py-1 text-white"
//               onClick={toggleSidebar}>Contact Us</Link>

//           </nav>
//         </div>

//         <div
//           className={`fixed inset-0 bg-black bg-opacity-50 z-10 ${isSidebarOpen ? "block" : "hidden"
//             }`}
//           onClick={toggleSidebar}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default Navbar;