import { CallToAction } from "~/features/home/call-to-action";
import { CostAnalysis } from "~/features/home/cost-analysis";
import { Features } from "~/features/home/features";
import { Header } from "~/features/home/header";
import { Hero } from "~/features/home/hero";
import { Statistics } from "~/features/home/statistics";

export const HomePage = async () => {
  fetch("http://10.1.10.240:3000/api/trpc/webhook.server", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      json: {
        organization_id: 24,
        server_name: "test",
        cpu_architecture: "x86_64",
        cpu_utilization: 50,
        memory_utilization: 50,
        power_consumption: 123.43,
      },
    }),
  })
    .then((res) => res.json().then((data) => console.log(data)))
    .catch((error) => console.error(error));

  return (
    <>
      <Header />
      <Hero />
      <Statistics />
      <Features />
      <CostAnalysis />
      <CallToAction />
    </>
  );
};
