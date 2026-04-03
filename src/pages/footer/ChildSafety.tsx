import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ChildSafety = () => {
  const currentDate = new Date().toDateString();

  return (
    <>
  {/* ✅ SEO META */}
  <Helmet>
    <title>Child Safety Policy | Vedvivah 18+ Platform Protection</title>

    <meta
      name="description"
      content="Vedvivah Child Safety Policy ensures strict 18+ access, zero tolerance for child exploitation, and compliance with global safety laws including COPPA and GDPR-K."
    />

    <meta
      name="keywords"
      content="child safety policy, CSAM prevention, Vedvivah safety, 18+ platform rules, online safety matrimony"
    />

    {/* Open Graph */}
    <meta property="og:title" content="Vedvivah Child Safety Policy" />
    <meta
      property="og:description"
      content="Zero tolerance for child exploitation. Safe and secure matrimony platform."
    />
    <meta
      property="og:image"
      content="https://vedvivah.com/logotest3.png"
    />
    <meta property="og:type" content="website" />
    <meta
      property="og:url"
      content="https://vedvivah.com/child-safety-policy"
    />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Child Safety Policy | Vedvivah" />
    <meta
      name="twitter:description"
      content="Strict 18+ platform with zero tolerance for abuse."
    />
    <meta
      name="twitter:image"
      content="https://vedvivah.com/logotest3.png"
    />

    {/* Canonical */}
    <link
      rel="canonical"
      href="https://vedvivah.com/child-safety-policy"
    />
  </Helmet>
    <div className="flex flex-col ">
      <div className="bg-[#fac5d6] text-center px-6 py-6 md:p-24 space-y-8">
        <h3 className="text-[#fa85aa] font-semibold text-base">
          Current as of {currentDate.toLocaleString()}
        </h3>
        <h1 className=" text-2xl md:text-4xl font-semibold">
          Ved Vivah Child Safety Policy
        </h1>
        <p className="text-[#475467] text-md md:text-xl text-balance">
          Ved Vivah is a strictly 18+ platform. While our service is not
          intended for minors, we follow strong child safety and CSAM prevention
          standards in compliance with Google Play policies.
        </p>
      </div>

      <div></div>

      <div className="px-4 py-4 flex md:flex-row flex-col gap-7">
        <div className="">
          <Nav activeSectionData={"Child Safety"} />
        </div>

        <div className="flex flex-col items-start md:pr-10">
          <h2 className="font-bold text-xl pb-4">
            Child Safety Policy And Zero Tolerance Policy{" "}
          </h2>
          <h3 className="font-bold text-md">Ved Vivah Child Safety Policy</h3>
          <p className="#475467 pb-4">
            Ved Vivah is designed strictly for adults aged 18 years and older.
            Minors are not permitted to use our platform. Although the app does
            not target children, we uphold strong Child Safety and CSAM
            prevention standards in compliance with Google Play’s Developer
            Policies, COPPA, GDPR-K, and other global child protection
            regulations.
          </p>
          Child Sexual Exploitation and Abuse We have a zero tolerance towards
          any form of child sexual exploitation and abuse. We don’t allow
          content that sexualises or endangers children, real or fictional (e.g.
          anime, media, text, illustrations, or digital images). This includes
          any visual depictions or discussions of sexually explicit conduct
          involving a child. For the purposes of this policy, a child is anyone
          under the age of 18 as we do not allow them on our platform. It’s prohibited to upload, store, produce, share,
          or entice anyone to share child sexual abuse material, even if the
          intent is to express outrage or raise awareness about this issue.
          <h3 className="font-bold text-md">
            1. Prohibition of Child Exploitation and Abuse
          </h3>
          <ul className="list-disc pl-4 py-4">
            <li>
              We strictly prohibit Child Sexual Abuse and Exploitation (CSAE),
              including any content, communication, or activity that may harm or
              endanger minors.
            </li>
            <li>
              These standards are clearly outlined in our Terms of Service,
              Community Guidelines, and Privacy Policy.
            </li>
            <li>
              Any violation results in immediate content removal, account
              suspension, and possible legal action.
            </li>
          </ul>
          <h3 className="font-bold text-md">
            2. User Reporting and Feedback System
          </h3>
          <ul className="list-disc pl-4">
            <li className="pb-4">
              Users can report inappropriate behavior, CSAE concerns, or policy
              violations directly through our in-app reporting tools or support
              channels. Reports are reviewed promptly, and necessary
              actions—including bans—are taken immediately.
            </li>
          </ul>
          <h3 className="font-bold text-md">
            3. Handling of Child Sexual Abuse Material (CSAM)
          </h3>
          <ul className="list-disc pl-4">
            <li className="pb-4">
              If any CSAM is identified, we remove it instantly, cooperate with
              law enforcement agencies, and report it to the National Center for
              Missing and Exploited Children (NCMEC) or appropriate authorities.
              Offenders face permanent suspension and legal consequences.
            </li>
          </ul>
          <h3 className="font-bold text-md">
            4. Compliance with Child Safety Laws
          </h3>
          <ul className="list-disc pl-4">
            <li className="pb-4">
              We comply with global child protection laws including:
              <br />– COPPA (Children’s Online Privacy Protection Act)
              <br />– GDPR-K (General Data Protection Regulation – Kids Section)
              <br />– Other applicable regional child safety regulations
              <br />
              We do not knowingly collect any data from minors and remove any
              underage accounts immediately if detected.
            </li>
          </ul>
          <h3 className="font-bold text-md">
            5. Child Safety Contact for Google Play Notifications
          </h3>
          <ul className="list-disc pl-4">
            <li className="pb-4">
              We have appointed a Child Safety Representative responsible for
              addressing safety concerns and responding to Google Play
              notifications related to CSAE.
              <br />
              <strong>Child Safety Officer Contact Email:</strong>{" "}
              <span className="underline">compliance@vedvivah.com</span>
              <p>
                {" "}
                <strong>Child Safety Officer Contact Number:</strong>{" "}
                <span className="underline">+91 6284704034</span>{" "}
              </p>
            </li>
          </ul>
          <h3 className="font-bold text-md">
            6. Content Moderation and Preventative Measures
          </h3>
          <ul className="list-disc pl-4">
            <li className="pb-4">
              We use automated monitoring tools and manual moderation to detect
              and remove harmful or inappropriate content. Content involving
              minors in inappropriate ways is flagged and reviewed immediately.
            </li>
          </ul>
          <h3 className="font-bold text-md">
            7. Regular Policy Updates and Compliance Review
          </h3>
          <ul className="list-disc pl-4">
            <li className="pb-4">
              Our Child Safety Policy is regularly updated to comply with
              evolving laws and Google Play guidelines. Changes are communicated
              to users, and continued use of the platform indicates acceptance.
            </li>
          </ul>
          <h4>
            For any child safety concerns, please contact our Child Safety Team
            at{" "}
            <span className="font-semibold underline">
              compliance@vedvivah.com
            </span>
          </h4>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChildSafety;

const sections = [
  { title: "Community Guidelines", links: "/community-guidelines" },
  { title: "About", links: "/about-us" },
  { title: "TERMS", links: "/terms-conditions" },
  { title: "PRIVACY", links: "/privacy-policy" },
  { title: "COOKIES POLICY", links: "/cookies-policy" },
  { title: "Services", links: "/services" },
  { title: "Child Safety", links: "/child-safety-policy" },
  { title: "Delete Account", links: "/delete-account" },
];

interface activeSectionProps {
  activeSectionData: string | null;
}

const Nav: React.FC<activeSectionProps> = () => {
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
