import React, { useState } from 'react';
import { ArrowLeft, Calendar, ClipboardCheck, CheckCircle2, Clock, MapPin, User, Smartphone, Mail } from "lucide-react";
import { LOCALIZATION } from '../localization';

const BookingPage = () => {
    const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success">("idle");

    React.useEffect(() => {
        document.title = "Book Blood Test Home Collection - Agilus Diagnostics (formerly SRL Diagnostics) Mohali";
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        location: "",
        email: "",
        date: "",
        time: "",
    });
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        phone?: string;
        location?: string;
        email?: string;
        date?: string;
        time?: string;
    }>({});

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const errors: typeof formErrors = {};
        if (!formData.name.trim()) {
            errors.name = LOCALIZATION.ERRORS.NAME_REQUIRED;
        } else if (formData.name.trim().length < 3) {
            errors.name = LOCALIZATION.ERRORS.NAME_SHORT;
        }

        if (!formData.phone.trim()) {
            errors.phone = "Mobile Number is required *";
        } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
            errors.phone = "Enter a valid 10-digit Mobile Number *";
        }

        if (!formData.location.trim()) {
            errors.location = LOCALIZATION.ERRORS.LOCATION_REQUIRED;
        } else if (formData.location.trim().length < 3) {
            errors.location = LOCALIZATION.ERRORS.LOCATION_INVALID;
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = LOCALIZATION.ERRORS.EMAIL_INVALID;
        }

        if (!formData.date) {
            errors.date = LOCALIZATION.ERRORS.DATE_REQUIRED;
        } else {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                errors.date = LOCALIZATION.ERRORS.DATE_PAST;
            }
        }

        if (!formData.time) {
            errors.time = LOCALIZATION.ERRORS.TIME_REQUIRED;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setBookingStatus("submitting");

        // Simulating the submission and redirecting directly to WhatsApp to avoid popup-blocking
        setTimeout(() => {
            const textParams = `Hi, I want to request a laboratory appointment.\n\n*Name:* ${formData.name}\n*Mobile:* ${formData.phone}\n*Location:* ${formData.location}\n*Email:* ${formData.email || 'N/A'}\n*Date:* ${formData.date}\n*Time Slot:* ${formData.time}`;
            const whatsappUrl = `https://wa.me/919115459115?text=${encodeURIComponent(textParams)}`;
            
            setBookingStatus("success");
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        }, 600);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans p-4 sm:p-8 flex flex-col justify-center items-center">
            <div className="w-full max-w-2xl">
                <a href="/" className="inline-flex items-center gap-2 text-google-blue mb-6 font-bold hover:underline transition-all cursor-pointer">
                    <ArrowLeft className="w-5 h-5" /> {LOCALIZATION.ACTIONS.BACK_HOME || "Back to Homepage"}
                </a>
                
                <div className="bg-white border border-google-border rounded-3xl p-6 sm:p-10 shadow-sm">
                    {bookingStatus === "success" ? (
                        <div className="text-center py-8 px-2 animate-fade-in">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-12 h-12 text-green-600 animate-pulse" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-[#202124] mb-3 leading-tight">
                                Booking Submitted!
                            </h1>
                            <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed font-semibold">
                                We are redirecting you to WhatsApp to instantly deliver your request. Our clinical team will reach you shortly on <span className="text-google-blue font-bold">{formData.phone}</span>.
                            </p>
                            <a 
                                href="/"
                                className="inline-block w-full sm:w-auto px-8 bg-google-blue hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all text-center"
                            >
                                Back to Homepage
                            </a>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-start gap-4 mb-8">
                                <div className="p-3 bg-blue-50 text-google-blue rounded-2xl shrink-0">
                                    <ClipboardCheck className="w-7 h-7" />
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">Request Lab Appointment</h1>
                                    <p className="text-xs text-gray-505 text-gray-500 font-bold mt-1">
                                        NABL Accredited Diagnostics • Sector 69 Mohali
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
                                {/* Name Input */}
                                <div className="space-y-1.5">
                                    <label htmlFor="booking-name" className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                        <User className="w-4 h-4 text-google-grey" /> Full Name *
                                    </label>
                                    <input 
                                        id="booking-name"
                                        type="text" 
                                        placeholder={LOCALIZATION.FORM_PLACEHOLDERS.NAME} 
                                        className={`w-full p-4 border rounded-2xl bg-white outline-none focus:ring-2 transition-all ${
                                            formErrors.name ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue hover:border-gray-400"
                                        }`}
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                                        }}
                                    />
                                    {formErrors.name && (
                                        <p className="text-xs text-red-500 font-semibold">{formErrors.name}</p>
                                    )}
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-1.5">
                                    <label htmlFor="booking-phone" className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                        <Smartphone className="w-4 h-4 text-google-grey" /> Mobile / Phone Number *
                                    </label>
                                    <input 
                                        id="booking-phone"
                                        type="tel" 
                                        placeholder="Enter 10-digit mobile number" 
                                        className={`w-full p-4 border rounded-2xl bg-white outline-none focus:ring-2 transition-all ${
                                            formErrors.phone ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue hover:border-gray-400"
                                        }`}
                                        value={formData.phone}
                                        onChange={(e) => {
                                            setFormData({ ...formData, phone: e.target.value });
                                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                                        }}
                                    />
                                    {formErrors.phone && (
                                        <p className="text-xs text-red-500 font-semibold">{formErrors.phone}</p>
                                    )}
                                </div>

                                {/* Location Input */}
                                <div className="space-y-1.5">
                                    <label htmlFor="booking-loc" className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-google-grey" /> Location or Address in Mohali / Chandigarh *
                                    </label>
                                    <input 
                                        id="booking-loc"
                                        type="text" 
                                        placeholder={LOCALIZATION.FORM_PLACEHOLDERS.LOCATION} 
                                        className={`w-full p-4 border rounded-2xl bg-white outline-none focus:ring-2 transition-all ${
                                            formErrors.location ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue hover:border-gray-400"
                                        }`}
                                        value={formData.location}
                                        onChange={(e) => {
                                            setFormData({ ...formData, location: e.target.value });
                                            if (formErrors.location) setFormErrors({ ...formErrors, location: undefined });
                                        }}
                                    />
                                    {formErrors.location && (
                                        <p className="text-xs text-red-500 font-semibold">{formErrors.location}</p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <div className="space-y-1.5">
                                    <label htmlFor="booking-email" className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-google-grey" /> Email Address (Optional)
                                    </label>
                                    <input 
                                        id="booking-email"
                                        type="email" 
                                        placeholder={LOCALIZATION.FORM_PLACEHOLDERS.EMAIL} 
                                        className={`w-full p-4 border rounded-2xl bg-white outline-none focus:ring-2 transition-all ${
                                            formErrors.email ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue hover:border-gray-400"
                                        }`}
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                                        }}
                                    />
                                    {formErrors.email && (
                                        <p className="text-xs text-red-500 font-semibold">{formErrors.email}</p>
                                    )}
                                </div>

                                {/* Date & Time Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Date */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="booking-date-field" className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-google-grey" /> Preferred Date *
                                        </label>
                                        <input 
                                            id="booking-date-field"
                                            type="date" 
                                            min={new Date().toISOString().split("T")[0]}
                                            className={`w-full p-4 border rounded-2xl bg-white outline-none focus:ring-2 transition-all ${
                                                formErrors.date ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue hover:border-gray-400"
                                            }`}
                                            value={formData.date}
                                            onChange={(e) => {
                                                setFormData({ ...formData, date: e.target.value });
                                                if (formErrors.date) setFormErrors({ ...formErrors, date: undefined });
                                            }}
                                        />
                                        {formErrors.date && (
                                            <p className="text-xs text-red-500 font-semibold">{formErrors.date}</p>
                                        )}
                                    </div>

                                    {/* Time */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="booking-time-field" className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-google-grey" /> Preferred Time Slot *
                                        </label>
                                        <select 
                                            id="booking-time-field"
                                            className={`w-full p-4 border rounded-2xl bg-white outline-none focus:ring-2 transition-all ${
                                                formErrors.time ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue hover:border-gray-400"
                                            }`}
                                            value={formData.time}
                                            onChange={(e) => {
                                                setFormData({ ...formData, time: e.target.value });
                                                if (formErrors.time) setFormErrors({ ...formErrors, time: undefined });
                                            }}
                                        >
                                            <option value="">{LOCALIZATION.FORM_PLACEHOLDERS.TIME_SLOT}</option>
                                            {Array.from({ length: 14 }).map((_, i) => {
                                                const hour = 6 + i;
                                                const ampm = hour >= 12 ? 'PM' : 'AM';
                                                const displayHour = hour > 12 ? hour - 12 : hour;
                                                return <option key={i} value={`${displayHour}:30 ${ampm}`}>{`${displayHour}:30 ${ampm}`}</option>;
                                            })}
                                        </select>
                                        {formErrors.time && (
                                            <p className="text-xs text-red-500 font-semibold">{formErrors.time}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Form Submit Button */}
                                <button 
                                    className="w-full bg-google-blue hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/10 active:scale-[0.99] text-white py-4 rounded-2xl font-bold text-base sm:text-lg cursor-pointer transition-all flex items-center justify-center gap-2"
                                    disabled={bookingStatus === "submitting"}
                                >
                                    {bookingStatus === "submitting" ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Scheduling Appointment...
                                        </>
                                    ) : (
                                        "Confirm & Schedule Sample Collection"
                                    )}
                                </button>
                                
                                <p className="text-[11px] text-center text-gray-500 leading-relaxed font-semibold">
                                    By submitting, you consent to our privacy agreements. Data transmission is NABL compliant and encrypted. Preferred times represents slot requests.
                                </p>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
