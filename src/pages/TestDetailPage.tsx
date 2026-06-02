import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Droplets, Syringe, ClipboardList, Zap } from "lucide-react";
import { testMenu } from '../constants';
import { LOCALIZATION } from '../localization';
import { BottomNav } from '../components/BottomNav';

const TestDetailPage = () => {
    const { testName } = useParams<{ testName: string }>();
    const navigate = useNavigate();
    const test = testMenu.find(t => t.code === testName || t.name === decodeURIComponent(testName || ''));
    
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');

    // Dynamic metadata and Schema.org injection for Google AI Overview (SGE) & crawler alignment
    useEffect(() => {
        if (!test) return;

        // 1. Dynamic document title
        document.title = `${test.name} - Price, Preparation & Reports in Mohali`;
        
        // 2. Dynamic GEO-optimized meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', `Book ${test.name} test at Agilus Diagnostics Mohali Sector 69. Cost: ₹${test.mrp}, Turner-around Time: ${test.tat}. Professional and NABL accredited home collection available.`);

        // 3. Dynamic Schema.org Structured Data
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "MedicalTest",
            "name": test.name,
            "description": `Diagnostic test ${test.name} at Agilus Diagnostics (formerly SRL Lab) Mohali Sector 69. Cost: ₹${test.mrp}, Sample: ${test.sample}, Preparation: ${test.preparation}.`,
            "provider": {
                "@type": "MedicalClinic",
                "name": "Agilus Diagnostics Mohali",
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
        <div className="min-h-screen bg-white font-sans p-4 sm:p-8 pb-24 md:pb-8 w-full max-w-full overflow-x-clip">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-google-blue mb-8 font-black hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5" /> {LOCALIZATION.ACTIONS.BACK}
            </button>
            <div className="max-w-4xl mx-auto border border-google-border rounded-3xl p-6 sm:p-8 shadow-sm">
                <span className="bg-google-blue/10 text-google-blue text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block border border-google-blue/20 mb-4 animate-pulse">
                    Accredited Diagnostic Scope
                </span>
                <h1 className="text-2xl sm:text-4xl font-black mb-6 text-[#202124] leading-tight">{test.name}</h1>
                
                <h2 className="text-xs font-black uppercase tracking-wider text-google-grey mb-4">Clinical Parameters & Logistics</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-4 border rounded-2xl bg-slate-50/50 border-google-border/60">
                        <Zap className="text-google-blue w-6 h-6 shrink-0"/>
                        <div>
                            <p className="text-google-grey text-xs uppercase font-black tracking-wider">Test MRP Cost</p>
                            <p className="font-extrabold text-lg text-[#202124]">₹{test.mrp}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border rounded-2xl bg-slate-50/50 border-google-border/60">
                        <Clock className="text-google-blue w-6 h-6 shrink-0"/>
                        <div>
                            <p className="text-google-grey text-xs uppercase font-black tracking-wider">Turnaround Time (TAT)</p>
                            <p className="font-extrabold text-lg text-[#202124]">{test.tat}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-4 p-4 border rounded-2xl bg-slate-50/50 border-google-border/60">
                        <ClipboardList className="text-google-blue w-6 h-6 shrink-0"/>
                        <div>
                            <p className="text-google-grey text-xs uppercase font-black tracking-wider">Analyzing Method</p>
                            <p className="font-bold text-[#202124]">{test.method}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-4 p-4 border rounded-2xl bg-slate-50/50 border-google-border/60">
                        <Droplets className="text-google-blue w-6 h-6 shrink-0"/>
                        <div>
                            <p className="text-google-grey text-xs uppercase font-black tracking-wider">Sample Material Required</p>
                            <p className="font-bold text-[#202124]">{test.sample}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-4 p-4 border rounded-2xl bg-slate-50/50 border-google-border/60">
                        <Syringe className="text-google-blue w-6 h-6 shrink-0"/>
                        <div>
                            <p className="text-google-grey text-xs uppercase font-black tracking-wider">Patient Preparation Guidelines</p>
                            <p className="font-bold text-google-blue">{test.preparation}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-google-border/60 pt-6">
                    <p className="text-xs text-google-grey leading-relaxed">
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
