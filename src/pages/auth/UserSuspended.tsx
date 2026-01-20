import React from "react";
import { Link } from "react-router-dom";

const AccountSuspended: React.FC = () => {
  const handleContactSupport = () => {
    const email = "vaidikvivaah@gmail.com";
    const subject = encodeURIComponent("Account Suspension Assistance");
    const body = encodeURIComponent(
      "Hello Support Team,\n\nMy account appears to be suspended. Could you please help me resolve this issue?\n\nThank you."
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    // Try Gmail first, fallback to default mail client
    const gmailWindow = window.open(gmailUrl, "_blank");
    if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed === 'undefined') {
      window.open(mailtoUrl, "_blank");
    }
  };

 

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 px-6 py-8 safe-area-inset">
      {/* Header */}
      <header className="w-full max-w-md mx-auto mb-8 lg:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-900 tracking-tight text-center">
          Account Status
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-md mx-auto text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-pink-200 to-rose-200 rounded-full p-5 md:p-6 shadow-lg animate-pulse">
            <span className="text-5xl md:text-6xl">😞</span>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-400 rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Status Text */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Account Suspended
          </h2>
          
          <div className="space-y-3">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-sm mx-auto">
              Your account has been temporarily suspended. Don't worry, we're here to help you resolve this issue quickly.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-sm mx-auto">
              Our support team will assist you in restoring access to your account.
            </p>
          </div>
        </div>

        {/* Help Tips */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-sm border border-pink-100 w-full max-w-sm mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <span className="text-pink-600">💡</span>
            Quick Resolution Tips
          </h3>
          <ul className="text-xs md:text-sm text-gray-600 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-0.5">•</span>
              Include your username in the support email
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-0.5">•</span>
              Check your email for suspension details
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-0.5">•</span>
              Response time: Usually within 24 hours
            </li>
          </ul>
        </div>
      </main>

      {/* Action Buttons */}
      <footer className="w-full max-w-md mx-auto space-y-4 mt-auto">
        <button
          onClick={handleContactSupport}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-pink-300 text-base md:text-lg"
        >
          📧 Contact Support
        </button>
        <div className="flex justify-center ">
            
        <Link
          to="/login"
          className="w-full text-center bg-white text-gray-600 font-medium py-3 px-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm md:text-base"
        >
          Login
        </Link>
        </div>
        
        {/* Support Info */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">
            Support email:{" "}
            <a 
              href="mailto:vedvivah@gmail.com" 
              className="text-pink-600 hover:text-pink-700 underline"
            >
              vedvivah@gmail.com
            </a>
          </p>
        </div>
      </footer>

      {/* Mobile Safe Area Spacer */}
      <div className="h-8 md:h-12 safe-area-inset-bottom"></div>
    </div>
  );
};

export default AccountSuspended;