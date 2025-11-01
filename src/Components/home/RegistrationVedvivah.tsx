import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const RegistrationVedvivah: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-rose-50 to-pink-100 py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="/vedvivah-couple.jpg" // 🖼️ Replace with your wedding image path
            alt="VedVivah Couple"
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
          />
        </motion.div>

        {/* Right Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-rose-700 leading-tight">
            Find Your Perfect Match with{" "}
            <span className="text-amber-600">VedVivah</span>
          </h1>
          <p className="text-gray-700 text-lg max-w-md mx-auto md:mx-0">
            Discover a soulful journey toward marriage. Trusted by thousands for
            meaningful connections rooted in values and compatibility.
          </p>

          <Button
            onClick={() => navigate("/register")}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Register Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationVedvivah;
