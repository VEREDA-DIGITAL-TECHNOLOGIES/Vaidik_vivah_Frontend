import { motion } from "framer-motion";
import { Heart, Feather, BookOpenText, Baby, Scissors, GraduationCap, BadgeCheck, Sparkles, ShieldCheck, Infinity } from "lucide-react";

// If you use shadcn/ui, uncomment these lines and ensure the import path matches your setup
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Light-weight local Card components (fallback if shadcn/ui isn't available)
const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-lg p-6">{children}</div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4">{children}</div>
);
const CardTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold tracking-tight">{children}</h3>
);
const CardContent = ({ children }: { children: React.ReactNode }) => (
    <div className="text-sm leading-relaxed text-white/80">{children}</div>
);

const samskaras = [
    {
        id: 1,
        title: "नामकरण संस्कार",
        icon: Feather,
        desc: " नवजात शिशु को उचित नाम देकर उसका व्यक्तित्व निर्माण।",
    },
    {
        id: 2,
        title: "अन्न प्राशन संस्कार",
        icon: Baby,
        desc: " बालक को प्रथम बार अन्न देने का संस्कार।",
    },
    {
        id: 3,
        title: "मुण्डन संस्कार",
        icon: Scissors,
        desc: " सिर के बाल हटाकर शुद्धिकरण व चित्त शुद्धि की प्रेरणा।",
    },
    {
        id: 4,
        title: "विद्यारंभ संस्कार",
        icon: GraduationCap,
        desc: " बालक को अक्षरज्ञान देकर शिक्षा प्रारंभ करना।",
    },
    {
        id: 5,
        title: "उपनयन / यज्ञोपवीत (जनेऊ) संस्कार",
        icon: BookOpenText,
        desc: " बालक को गायत्री मंत्र व यज्ञ की दीक्षा देना। इसे गायत्री दीक्षा भी कहते हैं।",
    },
    {
        id: 6,
        title: "विवाह संस्कार",
        icon: Heart,
        desc: " पति-पत्नी को धर्मयुक्त जीवन, जिम्मेदारी व सहयोग की प्रेरणा।",
    },
    {
        id: 7,
        title: "गर्भाधान संस्कार",
        icon: Sparkles,
        desc: " शुद्ध मन से श्रेष्ठ सन्तान की कामना व मानसिक तैयारी।",
    },
    {
        id: 8,
        title: "पुंसवन संस्कार",
        icon: BadgeCheck,
        desc: " गर्भस्थ शिशु के शुभ संस्कारों की स्थापना हेतु।",
    },
    {
        id: 9,
        title: "सीमंत संस्कार",
        icon: ShieldCheck,
        desc: " गर्भवती स्त्री की शारीरिक व मानसिक सुरक्षा हेतु प्रार्थना।",
    },
    {
        id: 10,
        title: "अन्त्येष्टि संस्कार",
        icon: Infinity,
        desc: " मृत्यु के बाद आत्मा की शांति व अगली यात्रा के लिए श्रद्धांजलि।",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

export default function AboutVedivah() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#fa85aa] to-[#FFFFFF] text-gray-900">
            {/* Hero */}
            <section className="relative overflow-hidden">
                {/* <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" /> */}

                <div className="mx-auto max-w-6xl px-4 pb-6 pt-24 md:pt-28  ">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="shadow-2xl p-2 bg-[#FECEDC] rounded-2xl">
                        {/* <span className="inline-flex items-center font-[Bembo-MT-Pro-Bold] gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-gray-700">
                            वेद विवाह
                        </span> */}
                        <div className="flex items-center justify-center mt-3">
                            <div className="bg-gradient-to-r from-[#FFFFFF] to-[#FD5C90] text-center  ml-9 text-black font-bold text-2xl py-3 w-[550px]  rounded-md shadow mb-4">
                            वेद विवाह, दो रिश्तों की नींव
                        </div>

                        </div>
                        {/* <h1 className="mt-4 text-3xl font-[Bembo-MT-Pro-Bold] leading-tight md:text-5xl">
                            वेद विवाह — दो रिश्तों की नींव
                        </h1> */}
                        <div className="flex justify-center">

                            <p className="mt-4 max-w-3xl text-justify  leading-relaxed text-gray-600 text-lg font-bold">
                            विवाह सिर्फ दो व्यक्ति की मिलन नहीं होता, दो व्यक्ति का बंधन नहीं होता,
                            शादी दो व्यक्ति की नींव होती हैं, दो व्यक्ति की एक विचार होती हैं, दो व्यक्ति एक जीवन होती है। जिसमें एक दूसरे के प्रति समर्पण होती हैं। ऐसा समर्पण जिसमें गुलामी न हो सिर्फ और सिर्फ आजादी हो और आजादी ऐसी की जिंदगी की नई उंचाई दे, दो व्यक्ति एक जीवन जैसे दो पंख एक पंछी, ना कभी पंख टूटे, ना कभी हौसला टूटे और न कभी साथ छुटे।
                            इस जिंदगी की नींव को मजबूत बनाने के लिए सनातन ऋषियों ने बनाए हैं  'वेद मंत्र ' और इस मंत्र को शादियों में होना बहुत जरूरी होती हैं और इसे समझना बहुत जरूरी हैं, यही नींव आपकी जिंदगी की रास्ता दिखाती हैं और रास्ते के हर ठोकर, हर काटे से बचाती हैं।``

                        </p>
                            
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-6 text-gray-800 bg-[#FECEDC]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Card>
                            <CardHeader>

                                <CardTitle>
                                    <div className="flex items-center justify-center mt-3">
                                        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#FD5C90] text-center  ml-9 text-black font-bold text-2xl py-3 w-[550px]  rounded-md shadow mb-4">
                                            वेद मंत्रों की नींव
                                        </div>

                                    </div>
                                    
                                    </CardTitle>
                            </CardHeader>
                            <CardContent >
                                <div className="flex justify-center">

                                    <p className="mt-4 max-w-3xl text-justify  leading-relaxed text-gray-600 text-lg font-bold">
                                        इस व्यवस्था को और मजबूत बनाने के लिए निम्न संस्कारो में बताया गया है।
                                    </p>

                                </div>
                                
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Samskara Grid */}
            <section className="mx-auto max-w-6xl px-4 pb-24 pt-6">
                <div className="mb-8 flex  justify-center">
                    
                        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#FD5C90] text-center  ml-9 text-black font-bold text-2xl py-3 w-[550px]  rounded-md shadow mb-4">
                            संस्कार, जीवन की राह
                        </div>
                    

                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
                    {samskaras.map((s, idx) => {
                        
                        return (
                            <motion.div key={s.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} custom={idx} className="bg-[#FECEDC]">
                                <Card >
                                    <CardHeader>

                                                   
                                          <div className="text-center">
                                            <CardTitle>{s.title}</CardTitle>
                                            </div>  
                                               
                                      
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mt-4 max-w-3xl text-justify  leading-relaxed text-gray-900 text-lg ">
                                            {s.desc}
                                        </p>
                                        
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Commitment Block */}
                <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    
                </motion.div>
            </section>

            {/* Footer Note
            <footer className="border-t border-white/10 bg-black/40">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    <p className="text-center text-sm text-white/60">
                        © {new Date().getFullYear()} वेद विवाह — संस्कारों से समृद्ध वैवाहिक जीवन
                    </p>
                </div>
            </footer> */}
        </div>
    );
}
