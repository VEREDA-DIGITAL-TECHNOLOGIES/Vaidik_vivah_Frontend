

const AboutUs = () => {
  const currentDate = new Date().toDateString();
   
  return (
    <div className="flex flex-col ">
      <div className="bg-[#fac5d6] text-center px-6 py-6 md:p-24 space-y-8">
        <h3 className="text-[#fa85aa] font-semibold text-base">
         Current as of {currentDate.toLocaleString()}
        </h3>
        <h1 className=" text-2xl md:text-4xl font-semibold">About</h1>
        <p className="text-[#475467] text-md md:text-xl text-balance">
          Leading and trusted matrimony platform, dedicated to uniting individuals with their ideal life partners.

        </p>
      </div>
      <div className="px-4 py-4 flex md:flex-row flex-col gap-7">
        <div className="">
          <Nav activeSectionData={"About"} /> 
        </div>
        <div className=" flex flex-col items-start md:pr-10">
          <h2 className="font-bold text-xl pb-4 "> About us</h2>
          <p>Ved Vivah, launched in 2025, is emerging as India’s fastest-growing matrimonial platform — available as both a mobile application and website — dedicated to delivering an exceptional matchmaking experience. We aim to expand opportunities for individuals to meet potential life partners from diverse communities and cultural backgrounds.

            Our vision is to create a world-renowned matchmaking service that touches the lives of millions across the globe. Ved Vivah is built on thorough research and analysis, with a strong focus on protecting user privacy and security. Featuring simple, engaging, and easy-to-use navigation, it offers the most advanced AI-powered matchmaking service to bring people closer to their perfect match.
                   </p>
          

        </div>
      </div>
    </div>
  );
  
}

export default AboutUs




import { Link } from "react-router-dom";

const sections = [
  { title: "Community Guidelines", links: "/community-guidelines" },
  { title: "About", links: "/about-us" },
  { title: "TERMS", links: "/terms-conditions" },
  { title: "PRIVACY", links: "/privacy-policy" },
  { title: "COOKIES POLICY", links: "/cookies-policy" },
  { title: "Services", links: "/services" },
  { title: "Child Safety", links: "/child-safety-policy" },
  { title: "Delete Account", links: "/delete-account" }
];

interface activeSectionProps {
  activeSectionData: string | null;
}

const Nav: React.FC<activeSectionProps> = ({
}: activeSectionProps) => {


  return (
    <div className="w-full md:w-72 p-4 bg-white shadow-md">
      {sections.map(({ title, links }) => (
        <div key={title} className="mt-4 cursor-pointer">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              <Link to={links}>{title}</Link>
            </h2>
          </div>
          <hr className="my-2 text-[#E6F2F7]" />
        </div>
      ))}
    </div>
  );
};


