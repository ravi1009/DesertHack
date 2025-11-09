import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="relative container mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
            Now in Public Beta
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-bold text-balance md:text-6xl lg:text-7xl">
            Stop paying for{" "}
            <span className="text-primary">unused resources</span>
          </h1>

          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-balance md:text-xl">
            &quot;Real-time observability that tracks CPU, memory, and disk
            usage. Automatic cost-benefit analysis shows exactly how much
            you&apos;re overspending on idle infrastructure.&quot;
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              View Live Demo
            </Button>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
