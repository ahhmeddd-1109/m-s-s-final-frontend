import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Drum, Guitar, Music4, Zap, Download, Cpu, Headphones } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import separationIcon from "@/assets/separation-icon.jpg";

const features = [
  {
    icon: Mic,
    title: "Vocal Extraction",
    description: "Isolate clean vocals from any song with industry-leading precision. Perfect for karaoke, remixing, or vocal analysis."
  },
  {
    icon: Drum,
    title: "Drum Separation",
    description: "Extract drum tracks with exceptional clarity. Ideal for producers looking to sample or analyze percussion patterns."
  },
  {
    icon: Guitar,
    title: "Bass Isolation",
    description: "Separate bass lines with remarkable accuracy. Great for musicians learning songs or creating backing tracks."
  },
  {
    icon: Music4,
    title: "Other Instruments",
    description: "Isolate melodic instruments including guitars, keyboards, and more from complex musical arrangements."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Advanced AI processing delivers results in minutes, not hours. Our optimized pipeline ensures quick turnaround times."
  },
  {
    icon: Download,
    title: "High Quality Output",
    description: "Export separated tracks in multiple formats including WAV, MP3, and FLAC with customizable quality settings."
  },
  {
    icon: Cpu,
    title: "Hybrid DEMUCS AI",
    description: "Powered by state-of-the-art Hybrid DEMUCS neural networks, delivering professional-grade source separation."
  },
  {
    icon: Headphones,
    title: "Studio Quality",
    description: "Professional results suitable for music production, remixing, and audio analysis applications."
  }
];

export const FeaturesSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: heroCardRef, isVisible: heroCardVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: gridRef, visibleItems } = useStaggeredAnimation(8, 150);

  return (
    <section className="py-20 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={titleRef}
          className={cn(
            "text-center mb-16 scroll-reveal",
            titleVisible && "visible"
          )}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
            Powerful AI Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the next generation of music source separation with advanced AI technology
            that delivers professional results in minutes.
          </p>
        </div>

        {/* Hero Feature Card with Scroll Animation */}
        <Card 
          ref={heroCardRef}
          className={cn(
            "mb-16 border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden scroll-reveal-scale hover-lift",
            heroCardVisible && "visible"
          )}
        >
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  Advanced Source Separation
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Our Hybrid DEMUCS AI model combines the best of both worlds - transformer 
                  architecture for long-range dependencies and convolutional networks for 
                  local audio features. This results in unparalleled separation quality.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">4-stem separation (vocals, drums, bass, other)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-muted-foreground">Support for all major audio formats</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-muted-foreground">Real-time processing status</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={separationIcon}
                  alt="Audio separation visualization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 md:from-background/20 to-transparent" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Grid with Staggered Animation */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={cn(
                "border-primary/20 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 hover:shadow-electric group hover-lift scroll-reveal",
                visibleItems.has(index) && "visible",
                `stagger-${index + 1}`
              )}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300 hover-glow">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Wave Animation */}
        <div className="mt-16 flex justify-center space-x-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-primary rounded-full animate-wave"
              style={{
                height: `${Math.random() * 40 + 20}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};