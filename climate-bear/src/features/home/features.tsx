import { Card } from "~/components/ui/card";
import {
  Activity,
  DollarSign,
  Gauge,
  Zap,
  Shield,
  TrendingDown,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Track CPU, memory, and disk usage across all your servers with millisecond precision.",
  },
  {
    icon: DollarSign,
    title: "Cost-Benefit Analysis",
    description:
      "Automatic calculation of wasted spend based on unused resources and actual server costs.",
  },
  {
    icon: Gauge,
    title: "Performance Insights",
    description:
      "Understand exactly where your resources are going and identify bottlenecks instantly.",
  },
  {
    icon: Zap,
    title: "Smart Alerts",
    description:
      "Get notified when resources are underutilized or when you can downgrade instances.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption and role-based access control.",
  },
  {
    icon: TrendingDown,
    title: "Optimization Recommendations",
    description:
      "AI-powered suggestions for rightsizing instances and reducing infrastructure spend.",
  },
];

export const Features = () => {
  return (
    <section className="px-4 py-20" id="features">
      <div className="container mx-auto">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-5xl">
            Observability that pays for itself
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-balance">
            &quot;Stop guessing about your infrastructure costs. Climate Bear
            shows you exactly where your money is going and how to optimize
            it.&quot;
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border bg-card hover:border-primary/50 p-6 transition-colors"
            >
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <feature.icon className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-card-foreground mb-2 text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
