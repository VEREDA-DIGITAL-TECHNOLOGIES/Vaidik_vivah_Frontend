
import '../../font.css';
import { ShieldCheck, Lock, Users } from 'lucide-react';
const Archive = () => {
  return (
    <div>
      
      <section className="px-6 py-12 bg-[#a44949] text-center">
       
        <h2 className="text-3xl font-Bembo-MT-Pro-Bold mb-10 text-[white]">
          Bringing People <span className="">Together</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-4 space-y-8 space-x-3 bg-white rounded-lg ">
            <Users className="w-10 h-10 text-[#a44949]" />
            <h3 className="text-lg font-Bembo-MT-Pro-SemiBold">100% Screened Profiles</h3>
            <div className="w-10 h-1 bg-[#782626] rounded-full"></div>
            <p className="text-gray-600 text-sm max-w-xs font-Bembo-MT-Pro-Regular">
              Search by location, community, profession & more from lakhs of active profiles
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center p-4 space-y-8 space-x-3 bg-white rounded-lg">
            <ShieldCheck className="w-10 h-10 text-[#a44949]" />
            <h3 className="text-lg font-Bembo-MT-Pro-SemiBold">Verifications by Personal Visit</h3>
            <div className="w-10 h-1 bg-[#a44949] rounded-full"></div>
            <p className="text-gray-600 text-sm max-w-xs font-Bembo-MT-Pro-Regular">
              Special listing for profiles verified by our agents through personal visits
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center p-4 space-y-8 space-x-3 bg-white rounded-lg">
            <Lock className="w-10 h-10 text-[#a44949]" />
            <h3 className="text-lg font-Bembo-MT-Pro-SemiBold">Control over Privacy</h3>
            <div className="w-10 h-1 bg-[#a44949] rounded-full"></div>
            <p className="text-gray-600 text-sm max-w-xs font-Bembo-MT-Pro-Regular">
              Restrict unwanted access to contact details & photos/videos
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Archive;
