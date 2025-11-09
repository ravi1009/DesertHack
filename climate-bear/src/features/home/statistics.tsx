import { Card } from "~/components/ui/card";

const stats = [
  {
    value: "47%",
    label: "Average cost reduction",
    subtext: "across all customers",
  },
  {
    value: "<5min",
    label: "Time to first insight",
    subtext: "with automatic setup",
  },
  {
    value: "99.9%",
    label: "Uptime guarantee",
    subtext: "with real-time monitoring",
  },
  {
    value: "$2.4M",
    label: "Total savings unlocked",
    subtext: "for our customers",
  },
];

export const Statistics = () => {
  return (
    <section className="bg-muted/30 px-4 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border bg-card p-6 text-center">
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                {stat.value}
              </div>
              <div className="text-foreground mb-1 text-sm font-medium">
                {stat.label}
              </div>
              <div className="text-muted-foreground text-xs">
                {stat.subtext}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
