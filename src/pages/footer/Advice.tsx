import { useState } from "react";
import { Helmet } from "react-helmet-async";


const adviceCardData = [
  {
    imageSrc: "/Advice-11.jpg",
    title: "Attraction vs. Compatibility",
    hoverContent: `Attraction can be instant and exciting, drawing two people together through physical appeal or an emotional connection. However, true compatibility goes deeper—it’s the glue that keeps a relationship thriving over time. Compatibility is about aligning on key life aspects such as values, long-term goals, lifestyles, and emotional needs.`,
  },
  {
    imageSrc: "/Advice-12.jpeg",
    title: "Finding Yourself First",
    hoverContent: `Before you can form a strong relationship with someone else, you need to have a clear understanding of who you are. Self-awareness forms the foundation of a healthy partnership. It’s about recognising your values, passions, and life goals while identifying what you want and need in a partner.`,
  },
  {
    imageSrc: "/Advice-13.jpg",
    title: "Effective Communication in Relationships",
    hoverContent: `Effective communication isn’t just about talking; it’s about connecting. Communication allows couples to build trust, resolve conflicts, and understand each other’s needs and perspectives.`,
  },
  {
    imageSrc: "/Advice-14.jpeg",
    title: "Setting Realistic Expectations",
    hoverContent: `It’s natural to have a vision of your ideal partner, but rigid expectations can prevent you from recognising genuine connections. A healthy relationship thrives on realistic expectations, rooted in mutual respect, shared values, and open-mindedness.`,
  },
  {
    imageSrc: "/Advice-15.jpeg",
    title: "Building Emotional Intimacy",
    hoverContent: `Emotional intimacy is what transforms a relationship from superficial to profound. It’s about creating a safe space where both partners feel seen, heard, and valued.`,
  },
  {
    imageSrc: "/Advice-16.jpeg",
    title: "How to Know if They're ‘The One’",
    hoverContent: `Determining if someone is “The One” isn’t about waiting for a perfect person or a magical moment; it’s about recognising a sense of alignment and ease in the relationship.`,
  },
];

const Advice = () => {
  return (
    <>
    {/* ✅ SEO META */}
      <Helmet>
        <title>Relationship Advice | Vedvivah - Build Meaningful Connections</title>

        <meta
          name="description"
          content="Get expert relationship advice on compatibility, communication, emotional intimacy, and finding the right partner. Vedvivah helps you build lasting and meaningful relationships."
        />

        <meta
          name="keywords"
          content="relationship advice, matrimony tips, compatibility, communication in relationships, Vedvivah"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Vedvivah Relationship Advice"
        />
        <meta
          property="og:description"
          content="Discover expert tips on building strong and lasting relationships with Vedvivah."
        />
        <meta
          property="og:image"
          content="https://vedvivah.com/logotest3.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vedvivah.com/advice" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Relationship Advice | Vedvivah"
        />
        <meta
          name="twitter:description"
          content="Learn how to build meaningful relationships with expert advice."
        />
        <meta
          name="twitter:image"
          content="https://vedvivah.com/logotest3.png"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://vedvivah.com/advice" />
      </Helmet>

    <div className="pt-8 font-lato">
      <div className="px-4 sm:px-20 py-16">
        <div className="py-16 space-y-8 xl:px-6 2xl:px-28 text-center">
          <h1
            className="text-4xl font-bold tracking-wide"
            style={{ fontFamily: "Proxima-Nova-regular" }}
          >
            our Trusted Partner in Finding the Perfect Match and Nurturing Lasting Relationships
          </h1>
          <p
            className="text-[#42526B] max-w-3xl mx-auto leading-7 text-lg"
            style={{ fontFamily: "Proxima-Nova-Regular" }}
          >
            At Ved Vivah, we believe meaningful relationships are built on understanding, respect, and shared values. Our platform guides you in discovering yourself, building trust, and communicating openly. With thoughtful insights and tools, we help you overcome challenges, nurture emotional closeness, and create lifelong bonds rooted in compatibility and mutual respect.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:px-6 2xl:px-28">
          {adviceCardData.map((card, index) => (
            <AdviceCard
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              hoverContent={card.hoverContent}
            />
          ))}
        </div>
      </div>
    </div>
        </>
  );
};

export default Advice;




interface AdviceCardProps {
  imageSrc: string;
  title: string;
  hoverContent: React.ReactNode;
}

const AdviceCard = ({ imageSrc, title, hoverContent }: AdviceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-lg border-2 border-[#E6E8EC] p-4 space-y-3 transition-all duration-300 ${isHovered ? "shadow-2xl border-transparent" : ""
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] xl:h-[280px]">
        <img
          src={imageSrc}
          alt="Advice"
          className="w-full h-full object-cover rounded-md transition-transform duration-300 scale-100 hover:scale-105 "
        />
      </div>
      <h1
        className="text-[#061C3D] text-lg sm:text-xl md:text-2xl font-medium"
        style={{ fontFamily: "Proxima-Nova-Regular" }}
      >
        {title}
      </h1>

      {/* Hover Content */}
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 p-4 rounded-lg transition-opacity duration-300">
          <div className="text-[#061C3D] text-center text-sm sm:text-base md:text-lg">
            {hoverContent}
          </div>
        </div>
      )}
    </div>
  );
};


