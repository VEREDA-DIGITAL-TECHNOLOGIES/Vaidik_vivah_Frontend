import Multistep from "../../Components/MultistepForm/Multistep"
import { Helmet } from "react-helmet-async";

const Questionare = () => {
    return (
        <>
        
       {/* ✅ SEO META */}
      <Helmet>
        <title>Start Your Journey | Vedvivah Matchmaking Questionnaire</title>

        <meta
          name="description"
          content="Complete your Vedvivah profile by answering simple questions about your name, age, and preferences. Start your journey to find the perfect life partner."
        />

        <meta
          name="keywords"
          content="matrimony signup, matchmaking questionnaire, create profile Vedvivah, marriage registration"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Vedvivah Signup - Start Your Matchmaking Journey"
        />
        <meta
          property="og:description"
          content="Answer a few simple questions and begin your journey to find your perfect life partner."
        />
        <meta
          property="og:image"
          content="https://vedvivah.com/logotest3.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vedvivah.com/questions"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vedvivah Signup" />
        <meta
          name="twitter:description"
          content="Create your matrimony profile and find your match."
        />
        <meta
          name="twitter:image"
          content="https://vedvivah.com/logotest3.png"
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://vedvivah.com/questions"
        />
      </Helmet>
        <div>
            <Multistep />
        </div>
         </>
    )
}

export default Questionare