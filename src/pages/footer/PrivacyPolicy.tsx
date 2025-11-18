const Privacy = () => {
  const currentDate = new Date().toDateString();
  return (
    <div className="flex flex-col ">
      <div className="bg-[#fac5d6] text-center px-6 py-6 md:p-24 space-y-8">
        <h3 className="text-[#fa85aa] font-semibold text-base">
          Current as of {currentDate.toLocaleString()}
        </h3>
        <h1 className=" text-2xl md:text-4xl font-semibold">Privacy Policy</h1>
        <p className="text-[#475467] text-md md:text-xl text-balance">
          Your privacy is important to us at Ved Vivah. We respect your privacy
          regarding any <br /> information we may collect from you across our
          website.
        </p>
      </div>
      <div className="px-4 py-4 flex md:flex-row flex-col gap-7">
        <div className="">
          <Nav activeSectionData={"PRIVACY"} />
        </div>
        <div className=" flex flex-col items-start md:pr-10">
          <h2 className="font-bold text-md pb-4">Privacy Policy</h2>

          <p className="pb-4">
            Welcome to the Ved Vivah Privacy Policy (“Policy”)! This explains
            how we collect, store, protect, and share your information, and with
            whom we share it. We suggest you read this in conjunction with our
            Terms and Conditions of Use.
          </p>

          <p className="pb-4">
            Whilst you’re enjoying the Ved Vivah mobile application, our
            websites and microsites (such as VedVivah.com), or using our digital
            products and services (such as our competitions or surveys)
            (together, referred to in this Privacy Policy as our “Sites”), we
            collect some information about you. In addition, you may choose to
            use the App or Sites to share information with other users,
            including your friends and contacts (“Users”). We may also need to
            share your information sometimes as described in this Policy.
          </p>

          <p className="pb-4">
            The App and Sites are operated and managed in India, and your
            information will be collected, stored, and processed only within
            India in accordance with applicable Indian data protection and
            privacy laws. We take appropriate measures to protect your personal
            data and ensure it remains secure.
          </p>

          <p className="font-semibold">Who We Are</p>

          <p className="pb-4">
            The App and Sites are operated by{" "}
            <strong>Vedvivah Private Limited</strong> (also referred to in this
            Policy as “we” or “us”), which is responsible for the collection and
            processing of personal information through the Ved Vivah App and
            Sites.
          </p>

          <h3 className="pb-4 font-semibold text-md">
            1. COLLECTION OF INFORMATION.
          </h3>
          <p>Registration Information</p>
          <p>
            When you download the App and create an account (“Account”), we may
            collect certain information (“Registration Information”) about you,
            such as:
          </p>

          <ul className="list-decimal pb-4 pl-4">
            <li>Name;</li>
            <li>Username;</li>
            <li>Email address</li>
            <li>Mobile number;</li>
            <li>Gender identity;</li>
            <li>Date, time, and location of birth;</li>
            <li>Sexual preference;</li>
            <li>Photographs;</li>
            <li>Location; and</li>
          </ul>

          <p className="pb-4">
            The information we collect helps us to enhance the App experience,
            maintain user safety, and verify our Users (robots are not
            welcome!). Registration details such as your name, gender, and
            preferences may be visible to other Users who view your profile
            based on your choice , as part of the intended functionality of the
            platform.
          </p>

          <p className="pb-4">
            For Users in India, the data we collect falls within the categories
            of “personal information” as defined under the Digital Personal Data
            Protection Act, 2023 (DPDP Act) and other applicable Indian data
            protection laws. This may include information such as your name,
            contact details, demographic information, preferences, and any
            content you choose to share through the Ved Vivah App or Sites.
          </p>

          <ul className="list-disc pb-4 pl-4">
            <li>
              A. <strong>Basic Identifiers</strong> – such as your full name,
              gender, age/date of birth, city, religion, and caste, which are
              required for creating a unique and personalized matrimonial
              profile.
            </li>
            <li>
              B. <strong>Contact Information</strong> – including your email
              address, phone number, and residential address (used for
              verification and AI-based match recommendations). Your contact
              details are not publicly visible unless you choose to share them.
            </li>
            <li>
              C. <strong>Profile and Matrimonial Details</strong> – such as
              education, profession, income, marital status, height, and
              lifestyle preferences. Users may choose whether these details are
              displayed publicly or only to selected matches.
            </li>
            <li>
              D. <strong>Photos, Audio, and Media</strong> – users may upload
              profile photos, and share photos or audio messages in chats. All
              such data is securely stored and encrypted using Firebase.
            </li>
            <li>
              E. <strong>Location Information</strong> – we collect manually
              selected location details (city and state) during registration to
              help provide relevant match recommendations. The app does not
              automatically collect GPS data.
            </li>
            <li>
              F. <strong>Transaction and Payment Information</strong> – if you
              subscribe to paid plans or services, payment and transaction
              details are collected and processed securely by trusted
              third-party payment gateways.
            </li>
            <li>
              G. <strong>Optional Sensitive Information</strong> – such as
              religion, community, or personal preferences, which users may
              choose to provide voluntarily for better matchmaking.
            </li>
            <li>
              H. <strong>Communication Data</strong> – messages and media
              exchanged between users through the in-app chat feature are
              encrypted and stored securely for user safety, without active
              monitoring or profiling.
            </li>
          </ul>

          <h3 className="text-md font-semibold pb-2">Profile Information</h3>

          <p className="pb-4">
            We encourage all members to carefully consider the information they
            choose to include in their profiles. As Ved Vivah is a matrimonial
            platform, certain basic details such as your name, gender, age, and
            city are required to create a verified profile. However, you have
            full control over what additional personal details—such as phone
            number, income, or profession—you wish to display to other members.
          </p>

          <p className="pb-4">
            Users can upload multiple profile photos, which are visible to other
            members on the platform. Uploaded images are subject to moderation
            and automated checks to prevent inappropriate or fake content,
            ensuring a safe and respectful community experience.
          </p>

          <p className="pb-4">
            As a matrimonial platform, Ved Vivah may collect personal
            information such as contact details, religious background, or
            preferences to help provide relevant matches. Users can decide which
            details are visible to others from their profile settings. We advise
            users to share only the information they are comfortable displaying
            publicly.
          </p>

          <p className="pb-4">
            For account security, we verify users through an email or one-time
            password (OTP) during registration. Ved Vivah does not perform photo
            or biometric verification, and no facial recognition technologies
            are used within the platform.
          </p>

          <p className="pb-4">
            If you delete your account, your profile data, photos, and any
            verification-related information are permanently deleted from our
            systems within seven (7) days, except where retention may be
            required by law or for fraud prevention.
          </p>

          <p className="pb-4">
            To protect our community, Ved Vivah employs automated systems to
            detect and restrict suspicious, duplicate, or fraudulent accounts.
            Accounts identified as potentially harmful or fake may be
            temporarily locked or require re-verification for security reasons.
          </p>

          <p className="pb-4">
            Our chat system allows users to send text, photo, and audio messages
            to their matches. These messages are securely stored in Firebase
            with encryption-at-rest to maintain data privacy and security. Ved
            Vivah does not actively monitor or read user conversations.
          </p>

          <h3 className="text-md font-semibold pb-2">
            Geolocation Information
          </h3>

          <p className="pb-4">
            Ved Vivah does not automatically collect your precise location
            through GPS, Wi-Fi, or IP tracking. Instead, we ask users to
            manually provide general location details, such as their city,
            state, or region, when creating or updating their profile. This
            helps us offer relevant match recommendations and display
            approximate location information to other users viewing your
            profile.
          </p>

          <p className="pb-4">
            The location data you provide is stored as plain text (for example,
            “Delhi, India”) and is not linked to any geographic coordinates. We
            do not access or request device-level location permissions on your
            phone.
          </p>

          <p className="pb-4">
            You may update or remove your location at any time by editing your
            profile settings. If you delete your account, all associated
            location data will also be permanently deleted within seven (7)
            days, in accordance with our data retention policy.
          </p>

          <h3 className="text-md font-semibold">
            Device and Photos Information
          </h3>
          <p className="pb-4">
            Ved Vivah may collect limited technical information about your
            device that is necessary for the internal functioning of the App —
            such as system compatibility and display sizing. We do not
            automatically collect unique device identifiers, model information,
            or operating system details beyond what is essential for app
            performance. Device data is never used for personalization or
            analytics purposes.
          </p>
          <p className="pb-4">
            The App may request permission to access your address book solely to
            enable internal contact-related features within Ved Vivah. This
            information is not shared with third parties and remains within the
            App’s secured environment.
          </p>
          <p className="pb-4">
            Photos or images are not accessed directly from the device gallery
            or camera. In cases where users upload photos manually, these are
            securely stored using Firebase and Cloudinary storage systems with
            encryption at rest. Basic metadata such as file URLs may be retained
            to enable proper display, but no photo analytics or sorting
            algorithms are applied. Currently, uploaded photos cannot be changed
            or deleted by users after submission.
          </p>

          <h3 className="text-md font-semibold">Links</h3>
          <p className="pb-4">
            Ved Vivah does not presently track or record how users interact with
            internal or external links. We do not use click analytics or share
            such data with any third-party services. This may be reviewed in
            future to improve in-app navigation and experience.
          </p>

          <h3 className="text-md font-semibold">
            Ved Vivah Success Stories, Surveys, and Other Contributions
          </h3>
          <p className="pb-4">
            Ved Vivah may, in the future, invite users to voluntarily share
            their success stories, feedback, or testimonials for research or
            promotional purposes. Participation in such activities will be
            entirely optional and based on explicit user consent. At present,
            Ved Vivah does not collect or publish user stories or feedback
            publicly on its website or mobile application.
          </p>

          <h3 className="text-md font-semibold">
            When You Contact Customer Support
          </h3>
          <p className="pb-4">
            When you contact Ved Vivah support through email or our in-app form,
            we may collect and store the information you provide, such as your
            email address and details of your query or issue. This information
            helps us resolve your request efficiently and maintain service
            quality.
          </p>
          <p className="pb-4">
            We also maintain records of user-initiated queries and complaints
            (including reports about or from other users) for internal use,
            safety monitoring, and legal compliance. These records are retained
            until they are no longer needed for support or compliance purposes,
            or until we decide to delete them as part of our regular data
            management processes. The information shared with Customer Support
            is used strictly for internal purposes and not disclosed to third
            parties.
          </p>

          <h3 className="text-md font-semibold">
            Cookies and Similar Technologies
          </h3>
          <p className="pb-4">
            Ved Vivah uses cookies and similar technologies on our website to
            support secure logins, session management, and user preferences.
            Cookies help us remember your account and settings to provide a
            smoother experience. We do not use cookies for advertising purposes.
          </p>
          <p className="pb-4">
            Our mobile application may use limited session-based identifiers
            such as Firebase authentication tokens for login and app
            functionality. These identifiers are not used for analytics or
            marketing and are automatically cleared when a session expires or a
            user logs out.
          </p>
          <p className="pb-4">
            You can manage or delete cookies at any time through your browser
            settings. Continued use of our website or app indicates your consent
            to our use of cookies for these essential purposes. A separate
            Cookie Policy page may be provided in the future for detailed
            information on how we use and manage cookies.
          </p>

          <h3 className="text-md font-semibold">2. USE OF YOUR INFORMATION.</h3>
          <p className="pb-4">
            Our main goal is to ensure your experience on Ved Vivah is an
            enjoyable one and you don’t end up getting stung! In order to
            deliver an enjoyable experience to you, we may use your Registration
            and other information to:
          </p>

          <h3 className="text-md font-semibold">2. Use of Your Information</h3>
          <p className="pb-4">
            Our main goal is to provide a safe, reliable, and personalized
            matrimonial experience for all users of Ved Vivah. We use the
            information you provide primarily to operate the platform, enable
            matchmaking features, and maintain account functionality. The data
            you share helps us enhance recommendations, improve overall
            usability, and maintain trust within the community.
          </p>

          <ul className="list-decimal pl-4 pb-4">
            <li>
              Provide and manage our matchmaking and recommendation services;
            </li>
            <li>
              Facilitate user registration, login, and account management;
            </li>
            <li>
              Contact users for important account updates, notifications, or
              support queries;
            </li>
            <li>
              Send information about feature improvements or new services
              offered by Ved Vivah;
            </li>
            <li>
              Personalize the App and website content based on user preferences
              such as location, age range, or gender, to display relevant
              profiles;
            </li>
            <li>
              Maintain platform integrity and prevent misuse by temporarily
              locking or reviewing accounts reported by other users;
            </li>
            <li>
              Store and review user complaints or chat-related reports when
              necessary to ensure user protection and maintain a safe
              environment;
            </li>
            <li>
              Improve our systems and perform limited technical testing to
              ensure platform functionality and reliability;
            </li>
            <li>
              Share minimal, anonymized data with trusted infrastructure
              services such as Firebase, solely for performance and stability
              monitoring;
            </li>
            <li>
              Communicate with users regarding promotions or recommendations
              within the App, only if the user has provided consent. Users may
              opt out at any time through app settings or by contacting our
              support team;
            </li>
            <li>
              Protect our users and the Ved Vivah platform against fraudulent or
              harmful activities through internal security and reporting
              mechanisms.
            </li>
          </ul>

          <h3 className="text-md font-semibold pb-4">Our Matching Approach</h3>
          <p className="pb-4">
            Ved Vivah aims to help users find suitable life partners in a
            respectful and community-based environment. We currently use a
            simple, manual matching process based on the basic details users
            provide in their profiles—such as age, location, gender, and
            preferences. This is not an automated or AI-based system. Our team
            may also consider user feedback and reports to improve
            recommendations over time.
          </p>
          <p className="pb-4">
            Users provide their general location manually (such as city or
            region), which helps us display potential matches from nearby areas.
            No precise GPS or automatic location tracking is used. Sensitive
            information such as caste or religion, if shared, is used only for
            internal matching visibility and is completely optional. Ved Vivah
            does not use any third-party matching algorithms or automated
            decision systems.
          </p>

          <h3 className="text-md font-semibold">Moderation Practices</h3>
          <p className="pb-4">
            To maintain a safe and respectful platform, we use a combination of
            manual review and basic automated tools to detect and prevent
            inappropriate content, fake accounts, or misuse of the app. Our
            moderation team may review reported profiles, photos, or other
            user-generated data to ensure compliance with our Terms and
            Conditions. If an account is found to be in violation, it may be
            temporarily restricted or permanently suspended.
          </p>
          <p className="pb-4">
            At this time, users cannot formally appeal moderation decisions
            through a dedicated in-app feature. However, users may contact
            customer support to discuss their account status or raise any
            concerns.
          </p>

          <h3 className="text-md font-semibold pb-4">
            3. Disclosure of Information
          </h3>
          <p className="pb-4">
            Ved Vivah respects user privacy and does not sell or trade personal
            data. Your registration details and profile information are kept
            strictly internal, with limited sharing only for operational
            purposes. In specific cases, we may share limited data with trusted
            third-party service providers to help us run the platform
            smoothly—for example:
          </p>

          <ul className="list-disc pl-4 pb-4">
            <li>
              <strong>Cloud Services:</strong> We use Firebase and Cloudinary to
              store user data and profile photos securely.
            </li>
            <li>
              <strong>Payment Processing:</strong> Payments for subscriptions or
              premium features are handled by Razorpay, a secure third-party
              payment gateway. Ved Vivah itself does not store your card or
              payment details.
            </li>
            <li>
              <strong>Moderation Tools:</strong> Automated or manual systems may
              review data solely for the purpose of detecting fraudulent or
              harmful activity.
            </li>
          </ul>

          <p className="pb-4">
            We do not currently share user data with law enforcement or
            government authorities unless legally compelled under applicable
            law. Ved Vivah also does not use or share user information for
            third-party advertising or marketing campaigns at this time. All
            marketing, if any, is done internally.
          </p>

          <p className="pb-4">
            In the event of a future change in ownership, merger, or
            partnership, Ved Vivah does not automatically transfer user data to
            another entity without clear notice and user consent. We also do not
            publicly share or sell aggregated demographic data.
          </p>
          <h3 className="text-md font-bold pb-4">
            MORE INFORMATION ABOUT DISCLOSURES
          </h3>

          <h4 className="text-md font-semibold">Service Providers</h4>
          <p>
            Ved Vivah engages certain trusted third-party services (“Service
            Providers”) to help us operate and deliver our App securely and
            efficiently. These providers are carefully selected and only receive
            the minimal information necessary to perform their functions. We do
            not share any user data directly; all exchanges are handled securely
            through encrypted systems.
          </p>

          <ul className="list-disc pl-4">
            <li>
              <strong>Firebase (by Google)</strong> – used for secure
              authentication, database storage, and app hosting. Firebase safely
              stores basic user information and uses encryption to protect data.
            </li>
            <li>
              <strong>Cloudinary</strong> – used for hosting and optimizing
              user-uploaded images (such as profile photos). Images are stored
              anonymously; Cloudinary does not know which user an image belongs
              to.
            </li>
            <li>
              <strong>Razorpay</strong> – used to process payments. Razorpay
              only receives the information needed to complete transactions and
              does not have access to user profiles or personal account data.
            </li>
          </ul>

          <p className="pb-4">
            Before using any third-party provider, Ved Vivah reviews their
            privacy policies and security standards. All Service Providers are
            contractually required to handle personal data responsibly, protect
            it from unauthorized access, and only use it for the purposes of
            providing their specific service. We do not allow any of our
            providers to use user data for their own marketing or analytics.
          </p>

          <h3 className="text-md font-semibold pb-4">
            Marketing Services Providers
          </h3>
          <p>
            Ved Vivah currently{" "}
            <strong>
              does not partner with or share data with marketing or advertising
              services
            </strong>{" "}
            such as Facebook Ads, Google Ads, or other marketing platforms.
          </p>
          <p>
            In the future, if marketing activities are introduced, they will be
            limited to
            <strong>registered Ved Vivah users only</strong> and will comply
            with privacy laws. Users will always have the option to opt out of
            such communications at any time.
          </p>

          <h3 className="text-md font-semibold pb-4">
            4. WHAT OTHERS MAY SEE ABOUT YOU.
          </h3>
          <p className="pb-4">
            Ved Vivah is designed to help users connect through their profiles.
            Registered users can view each other's profiles to find potential
            matches.
          </p>
          <p className="pb-4">
            Profile information, such as name, age, and basic details, is
            visible to other registered users. Profile photos are also visible
            by default. At this time, users cannot individually hide specific
            profile fields, but they can edit or remove their information at any
            time.
          </p>
          <p className="pb-4">
            Please be cautious when sharing sensitive information such as
            religion, caste, or location details in your profile. While this
            information helps improve matchmaking, it is entirely optional. Ved
            Vivah does not make any of this data public outside the app.
          </p>

          <h3 className="text-md font-semibold pb-4">
            5. OUR POLICY TOWARDS AGE.
          </h3>
          <p className="pb-4">
            You must be at least 18 years old to use Ved Vivah. We do not
            knowingly collect or process any personal information from minors.
            If we become aware that a person under 18 has registered with us, we
            will immediately terminate their account and delete their data.
          </p>

          <h3 className="text-md font-semibold pb-4">6. SECURITY.</h3>
          <p>
            Ved Vivah uses industry-standard security measures such as
            <strong>
              HTTPS encryption, firewalls, and Firebase’s built-in data
              protection
            </strong>
            to keep user information secure. We continuously monitor our systems
            for unauthorized access or vulnerabilities.
          </p>
          <p>
            While no online platform can guarantee 100% protection, we take all
            reasonable steps to safeguard your data. You can help protect your
            account by following these best practices:
          </p>

          <ul className="list-decimal pl-4">
            <li>
              Log out of your Ved Vivah account after use, especially on shared
              devices.
            </li>
            <li>Never share your password with anyone.</li>
            <li>
              Update your password regularly to maintain account security.
            </li>
          </ul>

          <p>
            Ved Vivah uses HTTPS to ensure that all data transmitted between
            your device and our servers is encrypted. Any transmission of data
            is done at your own risk, but we take all measures to reduce that
            risk.
          </p>

          <h3 className="text-md font-semibold pb-4">
            7. LINKING OTHER ACCOUNTS TO VED VIVAH.
          </h3>
          <p className="pb-4">
            Currently, Ved Vivah does not support signing in through social
            media accounts such as Facebook, Google, or Apple. Users can
            register and log in only using their email or phone number.
          </p>

          <p className="pb-4">
            In the future, we may introduce optional integrations allowing users
            to link social accounts (such as Instagram or Spotify) to enhance
            their profiles. These integrations will always be opt-in and will
            clearly describe what information is being shared before activation.
          </p>

          <h3 className="text-md font-semibold pb-4">8. YOUR RIGHTS.</h3>
          <p className="pb-4">
            Privacy laws may give you certain rights regarding your personal
            data. At Ved Vivah, users can exercise these rights directly through
            the app.
          </p>
          <ul className="list-decimal pl-4 pb-4">
            <li>
              <strong>Right to be informed:</strong> You have the right to know
              what personal data we collect and why. This information is
              explained in this Privacy Policy.
            </li>
            <li>
              <strong>Right of access:</strong> You can view the data you have
              provided directly through your account.
            </li>
            <li>
              <strong>Right to erasure:</strong> You can permanently delete your
              Ved Vivah account and data directly from the app at any time.
            </li>
            <li>
              <strong>Right to object or restrict processing:</strong> You can
              stop using the app and delete your account to prevent any further
              processing of your data.
            </li>
          </ul>
          <p className="pb-4">
            Users can delete their accounts directly from the Ved Vivah app.
            Once deleted, all personal data, including your email address stored
            in Firebase, will be removed from our systems within 7 days. We do
            not manually modify or correct user data.
          </p>

          <h3 className="text-md font-semibold pb-4">9. DATA LOCATIONS.</h3>
          <p className="pb-4">
            Ved Vivah uses secure, cloud-based hosting services to provide
            reliable access to our platform. User data is primarily stored on{" "}
            <strong>Firebase servers located in India</strong> and on
            <strong>Cloudinary</strong> for image storage. These services
            maintain industry-standard security measures and do not have access
            to identifiable user information.
          </p>
          <p className="pb-4">
            While data may be processed or backed up in other secure global data
            centers, we ensure that all transfers comply with strong legal and
            security safeguards.
          </p>

          <h3 className="text-md font-semibold pb-4">
            10. DATA RETENTION AND DELETION.
          </h3>
          <p className="pb-4">
            We retain your personal data only as long as necessary for the
            purposes outlined in this policy or as required by applicable law.
            Once an account is deleted, user data is removed within 7 days.
          </p>
          <ul className="list-decimal pl-4 pb-4">
            <li>
              For <strong>payment transactions</strong> made through Razorpay,
              limited data may be kept for as long as legally required for tax
              and accounting purposes.
            </li>
            <li>
              Support messages and complaint records may be retained for
              compliance and verification until no longer legally necessary.
            </li>
          </ul>
          <p className="pb-4">
            Even after deletion, some non-identifiable data or cached copies may
            remain temporarily due to technical or legal requirements.
            Third-party services (like Cloudinary or Razorpay) may also retain
            limited information under their own policies.
          </p>

          <h3 className="text-md font-semibold pb-4">
            11. CHANGES TO THIS POLICY.
          </h3>
          <p className="pb-4">
            Ved Vivah may update this Privacy Policy from time to time. If any
            material changes are made, we will notify users through in-app
            messages and/or by email. Continued use of the app after such
            updates indicates your acceptance of the revised policy.
          </p>
          <p>
            <strong>Effective date:</strong> This Privacy Policy was last
            updated on 10th November 2025.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

import { Link } from "react-router-dom";

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

const Nav: React.FC<activeSectionProps> = ({}: activeSectionProps) => {
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
