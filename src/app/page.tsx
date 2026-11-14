import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SwipeComparator from "@/components/SwipeComparator";
import BasinMap from "@/components/BasinMap";
import MetricsDashboard from "@/components/MetricsDashboard";
import EducationalGuide from "@/components/EducationalGuide";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#050B14]">
      <Header />
      <Hero />
      <SwipeComparator />
      <BasinMap />
      <MetricsDashboard />
      <EducationalGuide />
      <Footer />
    </main>
  );
}
