import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Droplets, Syringe, ClipboardList, Zap, Menu, Share2, Search, ShieldCheck } from "lucide-react";
import { testMenu } from '../constants';
import { LOCALIZATION } from '../localization';
import { BottomNav } from '../components/BottomNav';
import agilusLogo from "../assets/images/agilusLogo.png";

const TestDetailPage = () => {
    const { testName } = useParams<{ testName: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const test = testMenu.find(t => t.code === testName || t.name === decodeURIComponent(testName || ''));
    
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');

    // Dynamic metadata and Schema.org injection for Google AI Overview (SGE) & crawler alignment
    useEffect(() => {
        if (!test) return;

        // 1. Dynamic document title
        document.title = `${test.name} - Agilus Diagnostics (formerly SRL) Mohali`;
        
        // 2. Dynamic GEO-optimized meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', `Book ${test.name} test at Agilus Diagnostics (formerly SRL) in Sector 69, Mohali. Cost: ₹${test.mrp} with NABL standard 24/7 free home blood sample collection.`);

        // 3. Dynamic Schema.org Structured Data
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "MedicalTest",
            "name": test.name,
            "description": `Diagnostic test ${test.name} at Agilus Diagnostics (formerly SRL Diagnostics / SRL Lab Mohali). Cost: ₹${test.mrp}, Sample: ${test.sample}, Preparation: ${test.preparation}.`,
            "provider": {
                "@type": "MedicalClinic",
                "name": "Agilus Diagnostics (formerly SRL) - Sector 69, Mohali",
                "url": "https://reports.agilus.in/secure/login.aspx",
                "telephone": "+919115459115",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Booth No. 12, Gmada Market, near Gurukul World School, Sector 69",
                    "addressLocality": "Sahibzada Ajit Singh Nagar",
                    "addressRegion": "Punjab",
                    "postalCode": "160069",
                    "addressCountry": "IN"
                }
            }
        };

        const scriptId = "dynamic-medical-test-schema";
        let existingScript = document.getElementById(scriptId);
        if (!existingScript) {
            existingScript = document.createElement('script');
            existingScript.id = scriptId;
            existingScript.setAttribute('type', 'application/ld+json');
            document.head.appendChild(existingScript);
        }
        existingScript.textContent = JSON.stringify(schemaData);

        return () => {
            // Clean up structured data script & reset meta tags on unmount
            const scriptToRemove = document.getElementById(scriptId);
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [test]);

    if (!test) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8f9fa]">
                <div className="text-center p-8 bg-white border border-google-border rounded-3xl shadow-sm max-w-sm">
                    <p className="text-google-grey font-bold mb-4">Test details not found or expired.</p>
                    <button onClick={() => navigate('/')} className="text-google-blue font-black hover:underline">{LOCALIZATION.ACTIONS.BACK_HOME}</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/30 dark:bg-[#121314] font-sans pb-16 transition-colors duration-300">
            {/* Modern Cinematic Header (Sticky top-0) */}
            <header className="sticky top-0 z-[60] w-full bg-white/95 dark:bg-[#121314]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-zinc-800/80 px-4 sm:px-[24px] h-16 md:h-20 flex items-center shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        {/* Back button on mobile/tablet */}
                        <button
                            onClick={() => navigate(-1)}
                            className="lg:hidden p-2 rounded-full bg-gray-50 dark:bg-zinc-800 text-google-blue dark:text-blue-400 hover:bg-gray-150 transition-all cursor-pointer border-0 shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <Menu
                            aria-label="Menu"
                            className="hidden lg:block w-8 h-8 text-google-grey cursor-pointer hover:bg-google-light-grey rounded-full p-1.5 flex-shrink-0"
                        />
                        <RouterLink
                            to="/"
                            className="flex items-center gap-2 hover:opacity-85 active:scale-95 transition-all duration-200 overflow-hidden flex-shrink-0 select-none cursor-pointer"
                        >
                            {/* Official Agilus Logo Image */}
                            <img
                                src={agilusLogo}
                                alt="Agilus Diagnostics"
                                width={150}
                                height={48}
                                className="h-8 md:h-12 w-auto object-contain flex-shrink-0 cursor-pointer transition-all duration-200 hover:scale-[1.03]"
                                loading="eager"
                                referrerPolicy="no-referrer"
                            />
                        </RouterLink>
                    </div>

                    {/* Premium Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-5 xl:gap-8 mx-4 shrink-0" aria-label="Main Navigation">
                        <RouterLink
                            to="/"
                            className={`text-[13px] xl:text-sm font-bold tracking-tight transition-all duration-155 hover:text-google-blue relative py-1.5 ${location.pathname === '/' ? 'text-google-blue border-b-2 border-google-blue' : 'text-google-grey dark:text-gray-300'}`}
                        >
                            Overview
                        </RouterLink>
                        <RouterLink
                            to="/services"
                            className={`text-[13px] xl:text-sm font-bold tracking-tight transition-all duration-155 hover:text-google-blue relative py-1.5 ${location.pathname === '/services' ? 'text-google-blue border-b-2 border-google-blue' : 'text-google-grey dark:text-gray-300'}`}
                        >
                            Our Services
                        </RouterLink>
                        <RouterLink
                            to="/about"
                            className={`text-[13px] xl:text-sm font-bold tracking-tight transition-all duration-155 hover:text-google-blue relative py-1.5 ${location.pathname === '/about' ? 'text-google-blue border-b-2 border-google-blue' : 'text-google-grey dark:text-gray-300'}`}
                        >
                            About Lab
                        </RouterLink>
                        <RouterLink
                            to="/faq"
                            className={`text-[13px] xl:text-sm font-bold tracking-tight transition-all duration-155 hover:text-google-blue relative py-1.5 ${location.pathname === '/faq' ? 'text-google-blue border-b-2 border-google-blue' : 'text-google-grey dark:text-gray-300'}`}
                        >
                            FAQs
                        </RouterLink>
                        <RouterLink
                            to="/booking"
                            className={`text-[13px] xl:text-sm font-bold tracking-tight transition-all duration-155 hover:text-google-blue relative py-1.5 ${location.pathname === '/booking' ? 'text-google-blue border-b-2 border-google-blue' : 'text-google-grey dark:text-gray-300'}`}
                        >
                            Book Home Collection
                        </RouterLink>
                    </nav>

                    <div 
                        className="hidden md:flex flex-1 max-w-xs xl:max-w-sm items-center bg-google-light-grey dark:bg-zinc-850 rounded-full px-4 py-2 border border-transparent focus-within:border-google-blue/30 focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:shadow-sm transition-all cursor-pointer" 
                        onClick={() => navigate('/')}
                    >
                        <Search className="w-4 h-4 text-google-grey dark:text-gray-400 mr-2 shrink-0" />
                        <input
                            type="text"
                            readOnly
                            placeholder="Search Tests or Services..."
                            className="bg-transparent border-none outline-none w-full text-xs placeholder:text-google-grey dark:placeholder:text-gray-400 cursor-pointer pointer-events-none"
                        />
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: document.title,
                                        url: window.location.href,
                                    }).catch(() => {});
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert("Link copied to clipboard!");
                                }
                            }}
                            className="hidden md:flex p-2.5 rounded-full hover:bg-google-light-grey dark:hover:bg-zinc-800 text-google-grey dark:text-gray-350 transition-colors cursor-pointer border-0 bg-transparent"
                            aria-label="Share this app"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => navigate('/booking')}
                            className="px-4 md:px-5 py-2 md:py-2.5 bg-google-blue text-white rounded-full text-[13px] md:text-sm font-bold hover:bg-google-blue/90 shadow-sm whitespace-nowrap cursor-pointer transition-all active:scale-[0.98]"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 mt-12 mb-16">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-google-blue dark:text-blue-450 font-bold text-sm bg-white dark:bg-zinc-900 hover:bg-gray-50 border border-gray-200 dark:border-zinc-800 px-4 py-2.5 rounded-full shadow-sm transition-all inline-flex cursor-pointer mb-8"
                >
                    <ArrowLeft className="w-4 h-4" /> {LOCALIZATION.ACTIONS.BACK}
                </button>

                <div className="bg-white dark:bg-zinc-900 border border-google-border dark:border-zinc-805 rounded-3xl p-6 sm:p-10 shadow-sm">
                    <span className="bg-google-blue/10 dark:bg-blue-950/20 text-google-blue dark:text-blue-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block border border-google-blue/20 dark:border-zinc-700 mb-6 font-semibold shadow-xs">
                        Accredited Diagnostic Scope
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-[#1a1c1e] dark:text-white leading-tight tracking-tight">{test.name}</h1>
                    
                    <h2 className="text-xs font-black uppercase tracking-wider text-google-grey dark:text-gray-400 mb-4 border-b border-gray-100 dark:border-zinc-800 pb-2">Clinical Parameters & Logistics</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 border rounded-2xl bg-slate-50/50 dark:bg-zinc-850/40 border-google-border/60 dark:border-zinc-800 flex-1 hover:border-google-blue/40 transition-colors">
                            <Zap className="text-google-blue dark:text-blue-400 w-6 h-6 shrink-0"/>
                            <div>
                                <p className="text-google-grey dark:text-gray-400 text-[10px] uppercase font-black tracking-wider">Test MRP Cost</p>
                                <p className="font-extrabold text-xl text-[#1a1c1e] dark:text-white">₹{test.mrp}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 border rounded-2xl bg-slate-50/50 dark:bg-zinc-850/40 border-google-border/60 dark:border-zinc-800 flex-1 hover:border-google-blue/40 transition-colors">
                            <Clock className="text-google-blue dark:text-blue-400 w-6 h-6 shrink-0"/>
                            <div>
                                <p className="text-google-grey dark:text-gray-400 text-[10px] uppercase font-black tracking-wider">Turnaround Time (TAT)</p>
                                <p className="font-extrabold text-xl text-[#1a1c1e] dark:text-white">{test.tat}</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex items-center gap-4 p-5 border rounded-2xl bg-slate-50/50 dark:bg-zinc-850/40 border-google-border/60 dark:border-zinc-800 hover:border-google-blue/40 transition-colors">
                            <ClipboardList className="text-google-blue dark:text-blue-400 w-6 h-6 shrink-0"/>
                            <div>
                                <p className="text-google-grey dark:text-gray-400 text-[10px] uppercase font-black tracking-wider mb-0.5">Analyzing Method</p>
                                <p className="font-bold text-[#1a1c1e] dark:text-gray-100">{test.method}</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex items-center gap-4 p-5 border rounded-2xl bg-slate-50/50 dark:bg-zinc-850/40 border-google-border/60 dark:border-zinc-800 hover:border-google-blue/40 transition-colors">
                            <Droplets className="text-google-blue dark:text-blue-400 w-6 h-6 shrink-0"/>
                            <div>
                                <p className="text-google-grey dark:text-gray-400 text-[10px] uppercase font-black tracking-wider mb-0.5">Sample Material Required</p>
                                <p className="font-bold text-[#1a1c1e] dark:text-gray-100">{test.sample}</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex items-center gap-4 p-5 border rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-500/40 transition-colors">
                            <Syringe className="text-emerald-600 dark:text-emerald-400 w-6 h-6 shrink-0"/>
                            <div>
                                <p className="text-emerald-700/80 dark:text-emerald-400 text-[10px] uppercase font-black tracking-wider mb-0.5">Patient Preparation Guidelines</p>
                                <p className="font-extrabold text-emerald-800 dark:text-emerald-300">{test.preparation}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-google-border/60 dark:border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            onClick={() => navigate('/booking')}
                            className="w-full sm:w-auto px-8 py-3 bg-google-blue hover:bg-google-blue/90 text-white rounded-full text-sm font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
                        >
                            Book Home Collection Now
                        </button>
                        <a
                            href="https://wa.me/919115459115?text=Hello%20Agilus%20Diagnostics%20Mohali,%20I%20want%20to%20book%20a%20test."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 py-3 border border-gray-200 dark:border-zinc-850 hover:bg-slate-50 dark:hover:bg-zinc-850 text-google-grey dark:text-white rounded-full text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Consult via WhatsApp
                        </a>
                    </div>
                </div>

                <div className="mt-8 bg-amber-50/35 dark:bg-zinc-900/40 border border-amber-100/60 dark:border-zinc-805 rounded-2xl p-6">
                    <p className="text-xs text-google-grey dark:text-gray-400 leading-relaxed font-medium">
                        * Note: This diagnostic test is performed in compliance with national and international medical guidelines (NABL &amp; ISO). Real-time reports are delivered on email and WhatsApp. For fast doorstep pathology blood sample collection, contact our team immediately at <a href="tel:+919115459115" className="text-google-blue font-bold hover:underline">+91 91154 59115</a>.
                    </p>
                </div>
            </div>
            <BottomNav
                setIsBookingOpen={setIsBookingOpen}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
            />
        </div>
    );
};

export default TestDetailPage;
