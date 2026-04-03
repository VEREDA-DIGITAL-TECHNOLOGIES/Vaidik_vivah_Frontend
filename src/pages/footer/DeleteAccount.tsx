
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const DeleteAccount = () => {
    const currentDate = new Date().toDateString();
    const HeroData = {
        updatedAt: `Current as of ${currentDate.toLocaleString()}`,
        title: "Delete Account Policy",
        description:
            "Your trust, privacy, and data are important to us. This page outlines how you can delete your account and what happens to your data after deletion.",
    };

    return (
        <>
  {/* ✅ SEO META */}
  <Helmet>
    <title>Delete Account Policy | Vedvivah Data Removal</title>

    <meta
      name="description"
      content="Learn how to delete your Vedvivah account and understand what happens to your data after deletion. Secure and transparent data removal process."
    />

    <meta
      name="keywords"
      content="delete account Vedvivah, remove profile, data deletion policy, matrimony account delete"
    />

    {/* Open Graph */}
    <meta property="og:title" content="Vedvivah Delete Account Policy" />
    <meta
      property="og:description"
      content="Understand how to permanently delete your account and data from Vedvivah."
    />
    <meta
      property="og:image"
      content="https://vedvivah.com/logotest3.png"
    />
    <meta property="og:type" content="website" />
    <meta
      property="og:url"
      content="https://vedvivah.com/delete-account"
    />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Delete Account | Vedvivah" />
    <meta
      name="twitter:description"
      content="Step-by-step guide to delete your Vedvivah account."
    />
    <meta
      name="twitter:image"
      content="https://vedvivah.com/logotest3.png"
    />

    {/* Canonical */}
    <link
      rel="canonical"
      href="https://vedvivah.com/delete-account"
    />
  </Helmet>
        <div className="flex flex-col">
            <Hero {...HeroData} />
            <div className="flex flex-col md:flex-row flex-grow gap-5 p-4 md:p-16">
                <div>
                    <Nav activeSectionData={"DELETE ACCOUNT POLICY"} />
                </div>
                <div>
                    <p className="pb-4">
                        At Ved Vivah, we believe you have the right to access, modify, and delete your personal data at any time. This policy outlines the steps and implications involved in deleting your account from our platform.
                    </p>

                    <h3 className="text-md font-bold pb-2">1. How to Delete Your Account</h3>
                    <p className="pb-4">
                        You can delete your Ved Vivah account at any time by going to the App:
                        <br />
                        <strong>Profile Tab {'>'} Delete Account</strong>
                        <br />
                        Follow the on-screen instructions to permanently delete your account.
                    </p>

                    <h3 className="text-md font-bold pb-2">2. What Happens When You Delete Your Account?</h3>
                    <ul className="list-disc pl-4 pb-4">
                        <li>Your profile will be permanently removed from the platform.</li>
                        <li>You will no longer appear in search results or recommendations.</li>
                        <li>Your matches, messages, and personal data will be erased from our active systems.</li>
                        <li>Certain data (like payment history) may be retained as required by law or for security, fraud prevention, or audit purposes.</li>
                    </ul>

                    <h3 className="text-md font-bold pb-2">3. Can I Restore My Account After Deletion?</h3>
                    <p className="pb-4">
                        No. Once your account is deleted, it cannot be recovered. You would need to create a new account if you wish to use our services again.
                    </p>

                    <h3 className="text-md font-bold pb-2">4. Data Retention After Deletion</h3>
                    <p className="pb-4">
                        We may retain minimal data necessary for legal compliance, fraud detection, and security purposes. All other personal information is deleted or anonymized within 30 days.
                    </p>

                    <h3 className="text-md font-bold pb-2">5. Contact Us</h3>
                    <p className="pb-4">
                        If you need help deleting your account or have any questions regarding your data privacy, you can contact our support team at{" "}
                        <Link to="mailto:support@vedvivah" className="underline text-blue-600">
                            info@vedvivah
                        </Link>
                    </p>

                    <p className="text-sm text-gray-600">
                        Please review our <Link to="/privacy-policy" className="underline">Privacy Policy</Link> for more details on how your data is handled.
                    </p>
                </div>
            </div>
        </div>
          </>
    );
};

export default DeleteAccount;





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


interface HeroProps {
    updatedAt: string
    title: string
    description: string
}

const Hero: React.FC<HeroProps> = ({ updatedAt, title, description }: HeroProps) => {
    return (
        <div>
            <div className=" space-y-5 md:space-y-10 mt-14 md:mt-0 bg-[#fac5d6] p-4 md:p-24 text-center">
                <h3 className="text-base mt-10  font-semibold text-[#fa85aa]">
                    {updatedAt}
                </h3>
                <h1 className=" text-3xl md:text-5xl font-semibold">{title}</h1>
                <p className=" text-md md:text-xl text-[black] text-balance">
                    {description}
                </p>
            </div>
        </div>
    )
}
