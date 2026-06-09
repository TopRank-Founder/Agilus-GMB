import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  Stethoscope, 
  Phone, 
  MessageCircle, 
  CalendarPlus, 
  ChevronUp, 
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LOCALIZATION } from "../localization";

interface BottomNavProps {
  setIsBookingOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  activeTab?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  setIsBookingOpen,
  setActiveTab,
  activeTab,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const handleTabClick = (id: string) => {
    setIsActionsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      // Set active tab after path change
      setTimeout(() => {
        setActiveTab(id);
        if (id === "overview") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return;
    }

    setActiveTab(id);
    if (id === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleWhatsAppRedirect = () => {
    setIsActionsOpen(false);
    const whatsappUrl = `https://wa.me/919115459115?text=${encodeURIComponent(
      LOCALIZATION.WHATSAPP_GENERAL_TEMPLATE
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleCallRedirect = () => {
    setIsActionsOpen(false);
    window.location.href = `tel:${LOCALIZATION.CONTACT.PHONE_NUMBER}`;
  };

  const handleBookingTrigger = () => {
    setIsActionsOpen(false);
    if (location.pathname !== "/") {
      sessionStorage.setItem("triggerBookingOnMount", "true");
      navigate("/");
    } else {
      setIsBookingOpen(true);
    }
  };

  return (
    <>
      {/* Backdrop overlay when Quick Actions is expanded */}
      <AnimatePresence>
        {isActionsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsActionsOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Upward Expanding Quick Actions micro-panel */}
      <AnimatePresence>
        {isActionsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-[4.5rem] left-4 right-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-4 shadow-2xl z-[100] lg:hidden select-none"
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-3 mb-3">
              <div className="flex flex-col">
                <span className="text-[11px] text-google-blue dark:text-blue-400 font-extrabold uppercase tracking-widest leading-none">
                  Agilus Diagnostics Support
                </span>
                <span className="text-[10px] text-google-grey dark:text-zinc-400 font-semibold mt-1">
                  NABL Certified Pathology Services
                </span>
              </div>
              <button
                onClick={() => setIsActionsOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-150 dark:bg-zinc-800 flex items-center justify-center text-gray-500 dark:text-zinc-300 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Buttons Grid */}
            <div className="flex flex-col gap-2.5">
              {/* WhatsApp Action */}
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-900/30 px-3 flex items-center justify-between text-left transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-[#25d366] text-white flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-950 dark:text-white leading-tight">
                      Message on WhatsApp
                    </span>
                    <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold leading-tight">
                      Instant response &amp; query booking
                    </span>
                  </div>
                </div>
              </button>

              {/* Direct Call Action */}
              <button
                onClick={handleCallRedirect}
                className="w-full h-12 rounded-xl bg-orange-50 dark:bg-yellow-950/20 hover:bg-orange-100/50 dark:hover:bg-yellow-950/40 border border-orange-200/50 dark:border-yellow-905/30 px-3 flex items-center justify-between text-left transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-[#f4b400] text-white flex items-center justify-center">
                    <Phone className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-950 dark:text-white leading-tight">
                      Call Diagnostic Desk
                    </span>
                    <span className="block text-[10px] text-amber-600 dark:text-amber-400 font-semibold leading-tight">
                      +91 91154 59115
                    </span>
                  </div>
                </div>
              </button>

              {/* Secure Booking Form Trigger */}
              <button
                onClick={handleBookingTrigger}
                className="w-full h-12 rounded-xl bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100/50 dark:hover:bg-blue-950/40 border border-blue-250/50 dark:border-blue-900/30 px-3 flex items-center justify-between text-left transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-google-blue text-white flex items-center justify-center">
                    <CalendarPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-950 dark:text-white leading-tight">
                      Online Booking Form
                    </span>
                    <span className="block text-[10px] text-google-blue dark:text-blue-400 font-semibold leading-tight">
                      Submit schedule for doorstep sweep
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 flex justify-around items-center p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] select-none">
        {/* Overview Tab Button */}
        <button
          onClick={() => handleTabClick("overview")}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] p-2 transition-colors ${
            activeTab === "overview" && !isActionsOpen
              ? "text-google-blue dark:text-blue-400"
              : "text-google-grey dark:text-zinc-400 hover:text-google-blue"
          }`}
        >
          <Home
            className={`w-6 h-6 ${activeTab === "overview" && !isActionsOpen ? "fill-blue-50 dark:fill-blue-950/35" : ""}`}
          />
          <span className="text-[10px] font-black mt-1 uppercase tracking-wider">
            {LOCALIZATION.NAV.OVERVIEW}
          </span>
        </button>

        {/* Services Tab Button */}
        <button
          onClick={() => handleTabClick("services")}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] p-2 transition-colors ${
            activeTab === "services" && !isActionsOpen
              ? "text-google-blue dark:text-blue-400"
              : "text-google-grey dark:text-zinc-400 hover:text-google-blue"
          }`}
        >
          <Stethoscope
            className={`w-6 h-6 ${activeTab === "services" && !isActionsOpen ? "fill-blue-50 dark:fill-blue-950/35" : ""}`}
          />
          <span className="text-[10px] font-black mt-1 uppercase tracking-wider">
            Services
          </span>
        </button>

        {/* Unified Refactored Quick Actions expansion button */}
        <button
          onClick={() => setIsActionsOpen(!isActionsOpen)}
          className={`relative flex flex-col items-center justify-center min-h-[48px] min-w-[64px] px-3 py-1.5 rounded-2xl transition-all ${
            isActionsOpen
              ? "bg-google-blue/10 dark:bg-blue-450/15 text-google-blue dark:text-blue-400 border border-google-blue/20"
              : "text-google-grey dark:text-zinc-400 hover:text-google-blue"
          }`}
        >
          {/* Pulsing notification indicator for interactive discoverability */}
          {!isActionsOpen && (
            <span className="absolute top-2 right-4 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-google-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-google-blue"></span>
            </span>
          )}

          <ChevronUp
            className={`w-6 h-6 transition-transform duration-300 ${
              isActionsOpen ? "rotate-180 text-google-blue" : "animate-bounce"
            }`}
          />
          <span className="text-[10px] font-black mt-1 uppercase tracking-wider leading-none">
            Quick Help
          </span>
        </button>
      </div>
    </>
  );
};
