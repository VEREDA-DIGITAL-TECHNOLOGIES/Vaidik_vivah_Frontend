import Image from "next/image";
import React from "react";

const Mission = () => {
  return (
    <div className="pt-[83.5px] ">
      <div className="pt-16 space-y-16 px-16">
        <div className="flex">
          <h1 className="text-[#101828E5] text-7xl ">
            At the heart of VaidikVivah.
          </h1>
          <p className="text-[#42526B] text-lg">
            Cras imperdiet est eget nulla fringilla, sit amet volutpat sem
            tristique. Pellentesque quis augue ac mauris posuere vehicula.
          </p>
        </div>
        <div>
          <Image
            src="/mission.jpg"
            width={1200}
            height={100}
            alt="mission
            "
            className=""
          />
        </div>
      </div>
      {/* relationship */}

      {/* <div className="bg-white h-96">
        <div className="bg-[url('/mBG.svg')] bg-cover h-96  text-white">
          <div className="bg-[url('/Shape.svg')]">
            <div>
              <h1>Relationships are at the core of everything we do.</h1>
            </div>
          </div>
        </div>
      </div> */}
       <div className="bg-blue-700 text-white p-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Relationships are at the core of everything we do.</h1>
        <p className="text-lg mb-12">
          And not just the romantic kind. We can’t accomplish really hard things alone—so we make great relationships the foundation of our teamwork.
          <br />
          We believe these three core values are what it takes to build those great relationships.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white text-blue-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Authenticity</h2>
            <p className="mb-4">We share — never hide — our words, actions, and intentions.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn More →</a>
          </div>
          <div className="bg-white text-blue-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Courage</h2>
            <p className="mb-4">Breakthroughs require a willingness to take risks and embrace lofty goals and tough challenges.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn More →</a>
          </div>
          <div className="bg-white text-blue-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Empathy</h2>
            <p className="mb-4">We’re all humans first. So we deeply consider the perspectives of others, listen openly, and speak with care.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn More →</a>
          </div>
        </div>
      </div>
    </div>

      {/* relationship end */}

      {/* value in action  */}

      <div className="bg-[#F5F4F4] text-[#061C3D] font-lato p-16">
      <div className="container mx-auto ">
        <h1 className="text-4xl font-bold mb-4">We put our values in action.</h1>
        <p className="text-lg mb-12">
          Our principles guide us to put our values first with every decision.
        </p>
        <div className="flex gap-8">
          <div className="bg-white  rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Love the Problem</h2>
            <p>Breakthrough innovation happens when we spend time deeply understanding a problem, not jumping to solutions.</p>
          </div>
          <div className="bg-white  rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Keep it Simple</h2>
            <p>We prioritize elegant solutions that align with our biggest goals – both as an organization and within teams. We say {`"no"`} to a lot so we can do the few things that matter most.</p>
          </div>
          <div className="bg-white  rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Decide with Principles</h2>
            <p>We are highly thoughtful and intentional with every decision at VaidikVivah. Decisions are driven by principles, not arbitrary personal judgment.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Tend to Trust</h2>
            <p>At VaidikVivah, we tend to trust each other; we also put in the work to nurture and rebuild trust through transparency and open collaboration. When trust is missing, we speak up.</p>
          </div>
        </div>
      </div>
    </div>

      {/* value in action end */}

      {/* VaidikVivah difference */}

      <div className="bg-white text-[#061C3D] py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">The VaidikVivah Difference</h2>
        <p className="text-lg mb-12 text-gray-600">Our principles guide us to put our values first with every decision.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white  rounded-lg p-6 ">
            <h3 className="text-2xl font-semibold mb-4">Detailed Profiles</h3>
            <p className="mb-4">Go ahead, be picky. VaidikVivah profiles encourage you to share your religion, education, and day-to-day life so we can introduce you to the best people for you.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn more →</a>
          </div>
          <div className="bg-white  rounded-lg p-6 ">
            <h3 className="text-2xl font-semibold mb-4">Proven Prompts</h3>
            <p className="mb-4">Answer three prompts to activate your profile, and switch them up any time. We review our prompts and keep the ones that are most likely to get you out on a date.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn more →</a>
          </div>
          <div className="bg-white  rounded-lg p-6 ">
            <h3 className="text-2xl font-semibold mb-4">Conversation Starters</h3>
            <p className="mb-4">Our research found that liking specific pictures or prompts leads to better matches and more dates than liking a profile in general. So now users must like a specific part of a VaidikVivah profile—they can even add a comment to their like to kickstart a conversation.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn more →</a>
          </div>
          <div className="bg-white rounded-lg p-6 ">
            <h3 className="text-2xl font-semibold mb-4">Matchmaking Algorithm</h3>
            <p className="mb-4">VaidikVivah uses a Nobel-Prize-winning algorithm that helps you go on better quality dates, not just more dates. You’re eight times more likely to have a great date with your Most Compatible suggestions, aka the people you’re most likely to have mutual chemistry with.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn more →</a>
          </div>
          <div className="bg-white rounded-lg p-6 ">
            <h3 className="text-2xl font-semibold mb-4">Meaningful Likes</h3>
            <p className="mb-4">Research has shown us that eight is the magic number. When our members had more free likes per day, their matches were worse. When they had fewer, they were paying to send more. So now everyone gets eight for free.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn more →</a>
          </div>
          <div className="bg-white rounded-lg p-6 ">
            <h3 className="text-2xl font-semibold mb-4">Transparent Likes</h3>
            <p className="mb-4">No anonymous likes—we show you who has liked you, so you don’t miss out on a potential match.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn more →</a>
          </div>
          <div className="bg-white  rounded-lg p-6 ">
            <h3 className="text-2xl font-semibold mb-4">Reply Reminders</h3>
            <p className="mb-4">We let you know when it’s your turn to reply. It’s a friendly nudge that helps you focus on your matches and limits accidental ghosting.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn more →</a>
          </div>
          <div className="bg-white  rounded-lg p-6 ">
            <h3 className="text-2xl font-semibold mb-4">Smart Matches</h3>
            <p className="mb-4">We ask about your dates to learn your type so we can introduce you to the right people.</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Learn more →</a>
          </div>
        </div>
      </div>
    </div>

      {/* VaidikVivah difference end */}
    </div>
  );
};

export default Mission;
