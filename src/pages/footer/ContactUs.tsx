import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-gradient-to-t from-[#FFFFFF] to-[#FD5C90] text-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden">


                <div className="mx-auto max-w-5xl px-4 py-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl text-center font-bold md:text-5xl"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-4 max-w-5xl text-center text-black/80"
                    >
                        For any questions, suggestions, or assistance, you can reach us via email or phone.
                    </motion.p>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="mx-auto max-w-5xl px-4 pb-20">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                            <Mail className="h-6 w-6 text-indigo-400" />
                            <div>
                                <p className="text-sm text-black/60">Email</p>
                                <a
                                    href="mailto:info@vedvivah.com"
                                    className="text-lg font-medium hover:underline"
                                >
                                    info@vedvivah.com
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                            <Phone className="h-6 w-6 text-green-400" />
                            <div>
                                <p className="text-sm text-black/60">Phone</p>
                                <a href="tel:+911234567890" className="text-lg font-medium hover:underline">
                                    +917888684185
                                </a>
                            </div>
                        </motion.div> 

                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                            <MapPin className="h-6 w-6 text-red-400" />
                            <div>
                                <p className="text-sm text-black/60">Address</p>
                                <p className="text-lg font-medium">Aman Nagar, Jalandhar Punjab</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-4 rounded-2xl border border-white/10 bg-black/5 p-6 backdrop-blur"
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm mb-1">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-black placeholder-black/40 focus:border-indigo-400 focus:outline-none"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm mb-1">
                                Your Mobile 
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-black placeholder-black/40 focus:border-indigo-400 focus:outline-none"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm mb-1">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-black placeholder-black/40 focus:border-indigo-400 focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-black placeholder-black/40 focus:border-indigo-400 focus:outline-none"
                                placeholder="Write your message here"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#FD5C90] text-[white] px-4 py-2 font-semibold hover:bg-[#FD5C90] cursor-pointer"
                        >
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </section>


        </div>
    );
}
