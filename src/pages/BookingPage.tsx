import React from 'react';
import { ArrowLeft, Calendar, ClipboardCheck } from "lucide-react";
import { LOCALIZATION } from '../localization';

const BookingPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans p-8">
             <a href="/" className="flex items-center gap-2 text-google-blue mb-8 font-bold">
                <ArrowLeft className="w-5 h-5" /> {LOCALIZATION.ACTIONS.BACK_HOME}
            </a>
            <div className="max-w-xl mx-auto border border-google-border rounded-2xl p-8 shadow-sm">
                <h1 className="text-3xl font-black mb-6 text-[#202124]">Request Appointment</h1>
                <form className="space-y-4">
                    <input type="text" placeholder={LOCALIZATION.FORM_PLACEHOLDERS.NAME} className="w-full p-4 border rounded-xl" />
                    <input type="tel" placeholder={LOCALIZATION.FORM_PLACEHOLDERS.PHONE} className="w-full p-4 border rounded-xl" />
                    <input type="date" className="w-full p-4 border rounded-xl" />
                    <select className="w-full p-4 border rounded-xl">
                        <option value="">{LOCALIZATION.FORM_PLACEHOLDERS.TIME_SLOT}</option>
                        {Array.from({ length: 14 }).map((_, i) => {
                            const hour = 6 + i;
                            const ampm = hour >= 12 ? 'PM' : 'AM';
                            const displayHour = hour > 12 ? hour - 12 : hour;
                            return <option key={i} value={`${hour}:30`}>{`${displayHour}:30 ${ampm}`}</option>;
                        })}
                    </select>
                    <button className="w-full bg-google-blue text-white py-4 rounded-xl font-bold">{LOCALIZATION.ACTIONS.CONFIRM_BOOKING}</button>
                </form>
            </div>
        </div>
    );
};
export default BookingPage;
