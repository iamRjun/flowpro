import Button from "@/features/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function HeroSection() {
  return (
    <section className="pt-32 pb-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Open-source. Free. Built for teams.
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Project Management
          <br />
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Made Simple.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Manage projects, tasks, and teams all in one place. Open-source and
          built for modern teams.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/login" variant="primary" size="lg">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button href="https://github.com" variant="outline" size="lg">
            <FaGithub className="w-4 h-4" />
            View on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
