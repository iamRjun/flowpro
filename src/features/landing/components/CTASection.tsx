import Button from "@/features/components/ui/Button";
import { ArrowRight } from "lucide-react";

function CTASection() {
  return (
    <section className="py-20 px-4 text-center bg-primary/5 border-y border-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Ready to get started?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join teams already using FlowPro to ship better products, faster.
        </p>
        <Button href="/login" variant="primary" size="lg">
          Create your first project
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}

export default CTASection;
