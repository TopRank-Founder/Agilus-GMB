import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Navigation as SwiperNavigation,
  Pagination,
  A11y,
} from "swiper/modules";
import {
  CheckCircle2,
  Phone,
  FlaskConical,
  Calendar,
  ClipboardCheck,
  HeartPulse,
  ChevronDown,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const optimizeGmbImage = (url: string, opts: { width?: number; height?: number } = {}) => {
  if (!url) return url;
  if (url.includes("googleusercontent.com")) {
    const baseUrl = url.split("=")[0];
    const params: string[] = [];
    if (opts.width) params.push(`w${opts.width}`);
    if (opts.height) params.push(`h${opts.height}`);
    if (!opts.width && !opts.height) {
      params.push("s800");
    } else if (opts.width && opts.height) {
      params.push("c");
    }
    params.push("rw"); // Always force WebP format
    return `${baseUrl}=${params.join("-")}`;
  }
  return url;
};

interface HeroImage {
  src: string;
  alt: string;
  title: string;
  desc: string;
  badge: string;
  cta: string;
}

interface HeroSwiperProps {
  heroImages: HeroImage[];
  handleCall: () => void;
  setActiveTab: (tab: string) => void;
  setIsBookingOpen: (open: boolean) => void;
}

export default function HeroSwiper({
  heroImages,
  handleCall,
  setActiveTab,
  setIsBookingOpen,
}: HeroSwiperProps) {
  return (
    <div className="relative group w-full h-[380px] sm:h-[440px] md:h-[500px] lg:h-[540px] xl:h-[585px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-google-border">
      <Swiper
        modules={[Autoplay, EffectFade, SwiperNavigation, Pagination, A11y]}
        effect="fade"
        loop={true}
        navigation={{
          prevEl: ".hero-swiper-prev",
          nextEl: ".hero-swiper-next",
        }}
        pagination={{
          clickable: true,
          el: ".hero-swiper-pagination",
          bulletActiveClass: "w-8 bg-google-blue",
          bulletClass:
            "w-3 h-3 rounded-full bg-white/60 transition-all duration-300 inline-block mx-1 cursor-pointer border border-white",
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index} className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={optimizeGmbImage(img.src, {
                  width: index === 0 ? 1600 : 1000,
                  height: index === 0 ? 1000 : 660,
                })}
                alt={img.alt}
                className="w-full h-full object-cover brightness-[0.60] md:brightness-[0.75]"
                referrerPolicy="no-referrer"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
              />
            </div>
            {/* Integrated dynamic overlay: text and CTAs transition with the slide image natively */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 sm:p-10 md:p-12 z-10 flex flex-col justify-end h-full">
              <div className="max-w-3xl">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                  <span className="text-[10px] sm:text-xs font-black text-white bg-agilus-green px-3 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-lg border border-white/20">
                    {img.badge || "Best Diagnostic Lab in Mohali"}
                  </span>
                  <div className="flex items-center bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] text-white font-black uppercase tracking-widest border border-white/20">
                    <CheckCircle2 className="w-3 h-3 text-agilus-green mr-1.5 sm:mr-2" />
                    NABL Accredited
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white mb-2 sm:mb-4 leading-[1.1] drop-shadow-2xl tracking-tight">
                  {img.title === "Trusted Diagnostics" ? (
                    <>
                      Best Diagnostic <br className="hidden sm:block" />
                      <span className="text-agilus-green">Lab in Mohali</span>
                    </>
                  ) : (
                    img.title
                  )}
                </h1>

                {/* Description */}
                <p className="text-white/95 text-xs sm:text-sm md:text-lg mb-4 sm:mb-6 max-w-2xl font-medium leading-relaxed drop-shadow-md line-clamp-3 sm:line-clamp-none">
                  {img.desc.includes("heart of Mohali")
                    ? "Agilus Diagnostics (Formerly SRL) Sector 69. Superior Clinical Accuracy, 24/7 Free Home Sample Collection, & 3,000+ Specialized Tests."
                    : img.desc}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 w-full justify-start mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (index === 0) {
                        handleCall();
                      } else if (index === 1) {
                        setActiveTab("services");
                        const el = document.getElementById("services");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      } else if (index === 2 || index === 3) {
                        setIsBookingOpen(true);
                      } else if (index === 4) {
                        const el = document.getElementById("health-packages");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="bg-google-blue hover:bg-blue-650 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 hover:scale-[1.02] border border-white/10 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                  >
                    {index === 0 && (
                      <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white animate-pulse" aria-hidden="true" />
                    )}
                    {index === 1 && (
                      <FlaskConical className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-200" aria-hidden="true" />
                    )}
                    {index === 2 && (
                      <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-green-200" aria-hidden="true" />
                    )}
                    {index === 3 && (
                      <ClipboardCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-200" aria-hidden="true" />
                    )}
                    {index === 4 && (
                      <HeartPulse className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-pink-200" aria-hidden="true" />
                    )}
                    {img.cta}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slider Controls */}
      <button
        className="hero-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 z-20"
        aria-label="Previous slide"
      >
        <ChevronDown className="w-6 h-6 rotate-90" aria-hidden="true" />
      </button>
      <button
        className="hero-swiper-next absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 z-20"
        aria-label="Next slide"
      >
        <ChevronDown className="w-6 h-6 -rotate-90" aria-hidden="true" />
      </button>

      <div
        className="hero-swiper-pagination absolute bottom-6 right-6 z-20 flex gap-0"
        aria-label="Carousel pagination"
      />
    </div>
  );
}
