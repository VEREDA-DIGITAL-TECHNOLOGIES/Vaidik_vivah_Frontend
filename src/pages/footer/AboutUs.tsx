

const AboutUs = () => {
  const currentDate = new Date().toDateString();
   
  return (
    <div className="flex flex-col ">
      <div className="bg-[#fac5d6] text-center px-6 py-6 md:p-24 space-y-8">
        <h3 className="text-[#fa85aa] font-semibold text-base">
         Current as of {currentDate.toLocaleString()}
        </h3>
        <h1 className=" text-2xl md:text-4xl font-semibold">About Us</h1>
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
        <p> Ved Vivah is a modern, value-driven matrimony platform built to help individuals and families find the right life partner with trust, clarity, and cultural authenticity. We combine technology with tradition to create a reliable and respectful matchmaking experience for adults across India and abroad.

Our platform is designed for adults aged <b> 18 </b>and above who want meaningful, long-term relationships. Every profile is verified, every interaction is safeguarded, and every feature is built with privacy and security at the core.

At Ved Vivah, we believe that matchmaking should be simple, safe, and rooted in the values that matter. Whether you’re searching based on community, profession, or horoscope compatibility, we make the process smooth and thoughtful through secure chat, advanced filters, and guided profile creation.

We are committed to maintaining a safe digital ecosystem, strong data protection practices, and a zero-tolerance policy toward any form of inappropriate behavior. Our compliance and moderation team ensures that users enjoy a respectful, secure, and meaningful experience throughout their journey.

 <b>Ved Vivah</b> isn’t just a matrimony app — it’s a trusted platform created to bring good people together with confidence, transparency, and dignity.</p>
          

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


