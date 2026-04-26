import HomeScreenHero from "../home-screen-hero";
import HomeScreenBenefits from "../home-screen-benefits";
import HomeScreenFeatured from "../home-screen-featured";
import HomeScreenProcess from "../home-screen-process";
import HomeScreenCta from "../home-screen-cta";
import HomeScreenTestimonials from "../home-screen-testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-lb-bg">
      <HomeScreenHero />
      <HomeScreenBenefits />
      <HomeScreenFeatured />
      <HomeScreenProcess />
      <HomeScreenTestimonials />
      <HomeScreenCta />
    </main>
  );
}