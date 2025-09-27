import { Button } from "@/components/ui/button";
import { Upload, Zap, Music, Waves } from "lucide-react";
import { useParallax, useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-music-separation.jpg";
import HeroSpectrogram from "@/components/HeroWaveform";

export const HeroSection = () => {
  const { elementRef: heroRef, offset: parallaxOffset } = useParallax(0.3);
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { elementRef: iconsRef, isVisible: iconsVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-0"
    >
      {/* Spectrogram background only for hero */}
      <HeroSpectrogram height={600} className="-z-10" />

      {/* Background Image with Parallax (overlayed above spectrogram) */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      >
        <img
          src={heroImage}
          alt="Music source separation visualization"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      </div>

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 z-10">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-primary rounded-full opacity-20 blur-3xl animate-float"
          style={{ transform: `translateY(${parallaxOffset * -0.3}px)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-secondary rounded-full opacity-20 blur-3xl animate-float"
          style={{ animationDelay: "1s", transform: `translateY(${parallaxOffset * -0.2}px)` }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          "relative z-20 max-w-6xl mx-auto px-6 text-center scroll-reveal",
          contentVisible && "visible"
        )}
      >
        <div
          className={cn(
            "mb-8 flex justify-center scroll-reveal-scale",
            contentVisible && "visible"
          )}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
            <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/20 hover-glow">
              <Music className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        <h1
          className={cn(
            "text-5xl md:text-7xl font-bold mb-6 bg-gradient-music bg-clip-text text-transparent scroll-reveal",
            contentVisible && "visible"
          )}
        >
          Music Source
          <br />
          <span className="text-4xl md:text-6xl">Separation</span>
        </h1>

        <p
          className={cn(
            "text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed scroll-reveal",
            contentVisible && "visible stagger-2"
          )}
        >
          Separate any song into individual tracks using{" "}
          <span className="text-primary font-semibold">Hybrid DEMUCS</span>{" "}
          technology. Extract vocals, drums, bass, and other instruments with
          precision.
        </p>

        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 scroll-reveal",
            contentVisible && "visible stagger-3"
          )}
        >
          <Button
            variant="hero"
            size="lg"
            className="text-lg px-8 py-4 hover-lift"
            onClick={() => {
              document
                .getElementById("upload")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Your Music
          </Button>
        </div>

        {/* Feature Icons */}
        <div
          ref={iconsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {[
            { icon: Music, label: "Vocals" },
            { icon: Waves, label: "Drums" },
            { icon: Music, label: "Bass" },
            { icon: Waves, label: "Other" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={cn(
                "flex flex-col items-center space-y-2 opacity-0 scroll-reveal-scale hover-glow",
                iconsVisible && "visible",
                `stagger-${index + 4}`
              )}
            >
              <div className="w-12 h-12 bg-card/30 rounded-xl flex items-center justify-center border border-primary/20 hover-lift">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave Effect */}
      {/* Bottom Wave Effect */}
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-wave opacity-30 pointer-events-none" />
    </section>
  );
};
