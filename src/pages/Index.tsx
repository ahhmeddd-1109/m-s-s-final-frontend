import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { UploadSection } from "@/components/UploadSection";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <UploadSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
