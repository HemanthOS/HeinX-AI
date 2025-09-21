import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import CompanionSetup from "./companion"; // Import the CompanionSetup component
import HeinXDashboard from "./dashboard"; // Import the Dashboard component

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<"personal" | "professional" | null>(null);
  const [setupComplete, setSetupComplete] = useState(false);
  const [showCompanionSetup, setShowCompanionSetup] = useState(false);
  const router = useRouter();

  const handlePersonalClick = () => {
    setShowCompanionSetup(true);
  };

  const handleProfessionalClick = () => {
    router.push("/professional"); // ✅ fixed: goes to professional.tsx
  };

  const handleSetupComplete = () => {
    setSetupComplete(true);
    setShowCompanionSetup(false);
    router.push("/dashboard"); // ✅ after companion setup, go to dashboard
  };

  // If setup is complete, show dashboard
  if (setupComplete) {
    return <HeinXDashboard />;
  }

  // If companion setup is shown, display it
  if (showCompanionSetup) {
    return <CompanionSetup onSetupComplete={handleSetupComplete} />;
  }

  // Original home page content
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      
      {/* Professional Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle, #1f2937 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Professional Title Section */}
        <div className="text-center mb-20">
          <h1 className="text-7xl md:text-8xl font-bold text-slate-800 mb-6 tracking-tight">
            HeinX
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-6 font-normal max-w-2xl mx-auto leading-relaxed">
            Your AI{" "}
            <span className="text-blue-700 font-semibold">Companion</span> &{" "}
            <span className="text-slate-700 font-semibold">Professional</span>{" "}
            in one.
          </p>

          <div className="w-24 h-1 bg-blue-600 rounded-full mx-auto"></div>
        </div>

        {/* Professional Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Personal Companion Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className={`group relative p-10 bg-white rounded-xl shadow-lg border border-gray-200 cursor-pointer transition-all duration-300 ${
              hoveredCard === "personal"
                ? "shadow-xl border-blue-300 -translate-y-2"
                : "hover:shadow-lg hover:-translate-y-1"
            }`}
            onMouseEnter={() => setHoveredCard("personal")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handlePersonalClick}
          >
            <div className="relative">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <span className="text-2xl">✨</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                Personal Companion
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Build your profile, set goals, and let HeinX guide you like a real coach with memory + progress
                tracking.
              </p>

              <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium transition-all duration-300">
                <span className="mr-2">Learn More</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    hoveredCard === "personal" ? "translate-x-1" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Professional Assistant Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className={`group relative p-10 bg-slate-800 rounded-xl shadow-lg border border-slate-700 cursor-pointer text-white transition-all duration-300 ${
              hoveredCard === "professional"
                ? "shadow-xl border-slate-600 -translate-y-2 bg-slate-700"
                : "hover:shadow-lg hover:-translate-y-1"
            }`}
            onMouseEnter={() => setHoveredCard("professional")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleProfessionalClick}
          >
            <div className="relative">
              <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-600 transition-colors duration-300">
                <span className="text-2xl">🚀</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors duration-300">
                Professional Assistant
              </h2>

              <p className="text-lg text-slate-300 leading-relaxed mb-8 group-hover:text-slate-200 transition-colors duration-300">
                Hire HeinX for writing, research, and productivity — pay per task or unlock pro subscriptions.
              </p>

              <div className="flex items-center text-blue-300 group-hover:text-blue-200 font-medium transition-all duration-300">
                <span className="mr-2">Get Started</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    hoveredCard === "professional" ? "translate-x-1" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Professional Status Indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 bg-white rounded-full px-6 py-3 border border-gray-200 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-slate-600 text-sm font-medium">Trusted by professionals worldwide</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </div>
  );
}
