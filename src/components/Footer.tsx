// src/components/Footer.tsx
import { Music, Github, Twitter, Mail, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="relative border-t border-primary/20 bg-card/30 backdrop-blur-sm">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Brand Section (col 1) */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Music Source Separation
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Advanced Music Source Separation using Hybrid DEMUCS technology for professional results.
            </p>

            {/* Social Links */}
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/your-repo" target="_blank" rel="noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com/your-handle" target="_blank" rel="noreferrer">
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:your@email.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Team cards (cols 2..4) */}
          {/* Card: Student A */}
          <div className="bg-card/40 backdrop-blur-sm border border-primary/10 rounded-xl p-4 hover-lift">
            <div className="flex items-center space-x-4">
              <img
                src="https://ui-avatars.com/api/?name=Syed+Ahmed+Ali&background=7F56D9&color=fff&size=128"
                alt="Syed Ahmed Ali"
                className="w-16 h-16 rounded-full object-cover border border-primary/20"
              />
              <div>
                <h4 className="font-semibold">Syed Ahmed Ali</h4>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/alice" target="_blank" rel="noreferrer" aria-label="Alice GitHub">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/alice" target="_blank" rel="noreferrer" aria-label="Alice LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com/alice" target="_blank" rel="noreferrer" aria-label="Alice Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Card: Student B */}
          <div className="bg-card/40 backdrop-blur-sm border border-primary/10 rounded-xl p-4 hover-lift">
            <div className="flex items-center space-x-4">
              <img
                src="https://ui-avatars.com/api/?name=Mohd+Shoaib&background=7F56D9&color=fff&size=128"
                alt="Mohd Shoaib Mateen"
                className="w-16 h-16 rounded-full object-cover border border-primary/20"
              />
              <div>
                <h4 className="font-semibold">Mohd Shoaib Mateen</h4>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/bob" target="_blank" rel="noreferrer" aria-label="Bob GitHub">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/bob" target="_blank" rel="noreferrer" aria-label="Bob LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com/bob" target="_blank" rel="noreferrer" aria-label="Bob Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Card: Student C */}
          <div className="bg-card/40 backdrop-blur-sm border border-primary/10 rounded-xl p-4 hover-lift">
            <div className="flex items-center space-x-4">
              <img
                src="https://ui-avatars.com/api/?name=Vishwachari+M&background=7F56D9&color=fff&size=128"
                alt="Vishwachari"
                className="w-16 h-16 rounded-full object-cover border border-primary/20"
              />
              <div>
                <h4 className="font-semibold">Vishwachari</h4>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/charlie" target="_blank" rel="noreferrer" aria-label="Charlie GitHub">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/charlie" target="_blank" rel="noreferrer" aria-label="Charlie LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com/charlie" target="_blank" rel="noreferrer" aria-label="Charlie Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Music Source Separation. All Rights Reserved.
            </div>
            <div className="text-sm text-muted-foreground">
              Proudly presented to you by the students of CSE Dept PDA CE, Kalaburagi.
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-music" />
    </footer>
  );
};

export default Footer;
