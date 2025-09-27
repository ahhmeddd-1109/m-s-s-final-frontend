// src/components/AboutSection.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

export const AboutSection = () => {
  const { elementRef: aboutRef, isVisible: aboutVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={cn(
            "text-center mb-10 scroll-reveal",
            aboutVisible && "visible"
          )}
        >
          <h2 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
            About
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are final-year students exploring music source separation with Hybrid DEMUCS. Our goal is to make high-quality stems accessible for creators, DJs, and fellow learners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={cn("bg-card/40 backdrop-blur-sm border border-primary/10 hover-lift scroll-reveal", aboutVisible && "visible")}>
            <CardHeader>
              <CardTitle className="text-lg">Our Mission</CardTitle>
              <CardDescription>
                Our goal is to make professional-grade music source separation accessible to everyone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Powered by Hybrid DEMUCS, our tool lets creators easily isolate vocals, drums, bass, and instruments, combining advanced AI with a simple interface for limitless creativity.
              </p>
            </CardContent>
          </Card>

          <Card className={cn("bg-card/40 backdrop-blur-sm border border-primary/10 hover-lift scroll-reveal", aboutVisible && "visible")}>
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
              <CardDescription>
                Upload a song, run separation, and download individual stems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Behind the scenes we run a hybrid DEMUCS model to separate vocals, drums, bass and other instruments. Processing is done on the server and results are packaged for easy download.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="hover-lift" 
                asChild
                >
                <a href="https://github.com/your-repo" target="_blank" rel="noreferrer">
                    Learn More
                </a>
            </Button>

            </CardContent>
          </Card>

          <Card className={cn("bg-card/40 backdrop-blur-sm border border-primary/10 hover-lift scroll-reveal", aboutVisible && "visible")}>
            <CardHeader>
              <CardTitle className="text-lg">Get In Touch</CardTitle>
              <CardDescription>
                Feedback or bugs — we’re here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Reach out on GitHub or drop us an email. Contributions and issues are welcome — this project thrives with community help.
              </p>
              <div className="flex gap-3">
                <Button variant="hero" size="sm" className="hover-lift" asChild>
                  <a href="https://github.com" target="_blank" rel="noreferrer">
                    <Github className="w-4 h-4 mr-2 inline" />
                    GitHub
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="hover-lift" asChild>
                  <a href="mailto:hello@example.com">Email</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
