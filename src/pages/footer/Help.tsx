import { CiSearch } from "react-icons/ci";
// import FAQ from '../../components/faqs/Faqs';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Help = () => {
  return (
    <>
   {/* ✅ SEO META */}
      <Helmet>
        <title>Help & FAQs | Vedvivah Support</title>

        <meta
          name="description"
          content="Find answers to common questions about Vedvivah. Get help with matchmaking, profiles, security, and using our matrimony platform."
        />

        <meta
          name="keywords"
          content="Vedvivah help, matrimony FAQ, marriage site support, matchmaking help, shaadi help"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Vedvivah Help & FAQs" />
        <meta
          property="og:description"
          content="Get answers to your questions about Vedvivah matrimony services."
        />
        <meta
          property="og:image"
          content="https://vedvivah.com/logotest3.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vedvivah.com/help" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vedvivah Help Center" />
        <meta
          name="twitter:description"
          content="Need help? Find answers and support here."
        />
        <meta
          name="twitter:image"
          content="https://vedvivah.com/logotest3.png"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://vedvivah.com/help" />
      </Helmet>
    <div className=' font-lato'>
      <div className='flex flex-col items-center justify-center py-16 gap-9'>
        <span className='text-pink-500'>FAQs</span>
        <h1 className='text-5xl'>Help</h1>
        <h4 className='text-[#475467]'>Have questions? We’re here to help.</h4>
        <div className='flex items-center border-2 border-[#D0D5DD] rounded h-10 w-60'>
          <CiSearch className='text-3xl' />
          <input type="text" className='w-full h-full rounded border-none'
            placeholder='Search'
          />
        </div>
      </div>
      {/* <FAQ /> */}
      <div className="py-20 text-center bg-white space-y-10">
        <p className="font-bold">Still have questions?</p>
        <p className='text-[#475467] pb-5'>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
        <Link to={'/contact-us'} className="bg-[#fa85aa] text-white py-2 px-4 rounded 2">Get in touch</Link>

      </div>
    </div>
     </>
  )
}

export default Help
