import { Link } from "react-router-dom";
// import heroImg from "../../assets/bg.png";
import heroImg from "../../assets/Banner-8.png";
import Archive from "./Archive";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
    backgroundImage: `linear-gradient(to top, #FD5C90 5%, #00000033 30%), url(${heroImg})`,
    opacity: 0.95,
  }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative 3xl:pl-30   bg-opacity-40 text-white min-h-screen md:pl-16 md:flex md:px-10 gap-80 ">
        <div className="  2xl:px-20 py-28 max-md:mt-0 mt-10 xl:w-[100%] flex justify-center items-start">
          <div className=" text-center container   xl:w-[100%]  hero_content ">
            <h1 className="text-[2rem] sm:text-[50px]  md:text-[70px] lg:text-[90px] xl:text-[70px] text-[#FFFFFF] font-[Bembo-MT-Pro-Bold] leading-[60px] md:leading-[80px] lg:leading-[150px] xl:leading-[120px]  pt-32 xl:-tracking-normal">
              जहां मिलेंगीे पूर्व जन्म जोड़ियां
            </h1>
            <p
              className="  text-[#FFFFFF] py-10 text-[18px] xl:text-[28px] xl:pt-5 px-2 font-[Bembo-MT-Pro-Regular]"
              style={{
                lineHeight: "48px",
                letterSpacing: "2%",
                fontWeight: "400",
              }}
            >
              वहां होगी वैदिक विवाह की शहनाइयां| 
            </p>

            <Link
              to="/questions"
              className="relative z-10 flex gap-3 items-center justify-center bg-gradient-to-r from-[#FFFFFF] to-[#FD5C90] rounded-3xl w-[247px] h-[71px] text-[22px] text-black mx-auto xl:mt-8 font-[Bembo-MT-Pro-Regular]"
            >
              <span>Get Started  </span> <span><ArrowRight /></span>
            </Link>
          </div>

          {/* mobile card in hero section 
          <div className="absolute top-[60px] right-[130px] backdrop-blur backdrop-brightness-125 rounded-3xl w-[25%] h-[73%]   border-8 border-white-2 flex items-center justify-center hidden  md:block 3xl:mr-[5%] lg:hidden" ></div>
         */}
        </div>
        <div
          className="absolute  bottom-36 -right-7 sm:pt-40  md:bottom-[15rem] md:right-[4rem] xl:bottom-60   xl:right-[4rem] 2xl:rigth-[4rem]  3xl:ml-[18%]  "
          style={{ transform: "translateY(50%)" }}
        >
          
        </div>
      </div>
      <Archive/>
    </div>
  );
}

export default Hero;
