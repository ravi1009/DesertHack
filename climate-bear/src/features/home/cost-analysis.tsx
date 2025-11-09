import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

export const CostAnalysis = () => {
  return (
    <section className="bg-muted/30 px-4 py-20">
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-balance md:text-4xl">
              See exactly what {"you're"} paying for
            </h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              {
                "Climate Bear connects to your cloud provider and maps every dollar spent to actual resource usage. Our cost-benefit engine calculates the optimal instance sizes based on your real usage patterns."
              }
            </p>

            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-accent/20 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <div className="bg-accent h-2 w-2 rounded-full" />
                </div>
                <div>
                  <div className="text-card-foreground mb-1 font-medium">
                    Automatic waste detection
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {
                      "Identify servers running at <20% capacity and calculate potential savings"
                    }
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-accent/20 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <div className="bg-accent h-2 w-2 rounded-full" />
                </div>
                <div>
                  <div className="text-card-foreground mb-1 font-medium">
                    Historical trend analysis
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Track usage patterns over time to predict future needs and
                    budget accurately
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-accent/20 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <div className="bg-accent h-2 w-2 rounded-full" />
                </div>
                <div>
                  <div className="text-card-foreground mb-1 font-medium">
                    Multi-cloud support
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Works with AWS, GCP, Azure, and any infrastructure with
                    metrics export
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              See It In Action
            </Button>
          </div>

          <Card className="border-border bg-card p-8">
            <div className="space-y-6">
              <div>
                <div className="text-muted-foreground mb-2 text-sm">
                  Monthly Infrastructure Cost
                </div>
                <div className="text-card-foreground text-4xl font-bold">
                  $24,580
                </div>
              </div>

              <div className="bg-border h-px" />

              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      CPU Usage
                    </span>
                    <span className="text-card-foreground text-sm font-medium">
                      34%
                    </span>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <Progress
                      className="bg-accent/20"
                      progressIndicatorStyles="bg-accent"
                      value={34}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Memory Usage
                    </span>
                    <span className="text-card-foreground text-sm font-medium">
                      48%
                    </span>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <Progress
                      value={48}
                      className="bg-primary/20"
                      progressIndicatorStyles="bg-primary"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Disk Usage
                    </span>
                    <span className="text-card-foreground text-sm font-medium">
                      62%
                    </span>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <Progress
                      value={62}
                      className="bg-chart-4/20"
                      progressIndicatorStyles="bg-chart-4"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-border h-px" />

              <div className="bg-accent/10 rounded-lg p-4">
                <div className="text-muted-foreground mb-1 text-sm">
                  Potential Monthly Savings
                </div>
                <div className="text-accent text-3xl font-bold">$11,200</div>
                <div className="text-muted-foreground mt-2 text-sm">
                  {"By rightsizing 12 underutilized instances"}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
