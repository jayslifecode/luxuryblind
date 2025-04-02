"use client";

import ContactEmergencyServiceSection from "../contact-screen-emergency";
import ContactFaqSection from "../contact-screen-faq";
import ContactFormMapSection from "../contact-screen-form-map";
import ContactScreenHero from "../contact-screen-hero";
import ContactInfoSection from "../contact-screen-info";
import ContactNewsletterSection from "../contact-screen-news";

export default function ContactViewScreen() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <ContactScreenHero />
            <ContactInfoSection />
            <ContactFormMapSection />
            <ContactFaqSection />
            <ContactEmergencyServiceSection />
            <ContactNewsletterSection />
        </div>
    );
}