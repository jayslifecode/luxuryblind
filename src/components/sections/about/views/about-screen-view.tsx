"use client";

import AboutScreenCta from "../about-section-cta";
import AboutScreenCertification from "../about-screen-certification";
import AboutTeamSection from "../about-screen-team";
import AboutCoreValuesSection from "../about-screen-core-values";
import AboutOurStorySection from "../about-screen-story";
import AboutMilestonesSection from "../about-screen-milestone";
import AboutScreenHero from "../about-screen-hero";

export default function AboutScreenView() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <AboutScreenHero />
            <AboutOurStorySection />
            <AboutCoreValuesSection />
            <AboutTeamSection />
            <AboutMilestonesSection />
            <AboutScreenCertification />
            <AboutScreenCta />
        </div>
    );
}