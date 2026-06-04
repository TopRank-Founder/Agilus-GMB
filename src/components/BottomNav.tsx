import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Stethoscope, CalendarPlus, Phone } from "lucide-react";
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

  const handleTabClick = (id: string) => {
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

  const navItems = React.useMemo(() => [
    {
      name: LOCALIZATION.NAV.OVERVIEW,
      id: "overview",
      icon: Home,
      action: () => handleTabClick("overview"),
    },
    {
      name: LOCALIZATION.NAV.SERVICES,
      id: "services",
      icon: Stethoscope,
      action: () => handleTabClick("services"),
    },
    {
      name: "Book",
      id: "book",
      icon: CalendarPlus,
      action: () => {
        if (location.pathname !== "/") {
          sessionStorage.setItem("triggerBookingOnMount", "true");
          navigate("/");
        } else {
          setIsBookingOpen(true);
        }
      },
    },
    {
      name: "Contact",
      id: "contact",
      icon: Phone,
      action: () => (window.location.href = `tel:${LOCALIZATION.CONTACT.PHONE_NUMBER}`),
    },
  ], [location.pathname, navigate, setIsBookingOpen, handleTabClick]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 flex justify-around items-center p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.name}
            onClick={item.action}
            className={`flex flex-col items-center justify-center p-2 transition-colors ${isActive ? "text-google-blue" : "text-google-grey hover:text-google-blue"}`}
          >
            <item.icon
              className={`w-6 h-6 ${isActive ? "fill-blue-50" : ""}`}
            />
            <span
              className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${isActive ? "text-google-blue" : ""}`}
            >
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};
