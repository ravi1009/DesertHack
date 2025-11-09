import { CallToAction } from "~/features/home/call-to-action";
import { CostAnalysis } from "~/features/home/cost-analysis";
import { Features } from "~/features/home/features";
import { Header } from "~/features/home/header";
import { Hero } from "~/features/home/hero";
import { Statistics } from "~/features/home/statistics";

export const HomePage = () => {
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
