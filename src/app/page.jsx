import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import WhyChoose from "@/components/home/WhyChoose";

export default function Home() {
  const stats = {
    totalEvents: 30,
    totalAttendees: 4000,
    totalOrgs: 10,
  };
  return (
    <div>
      <main>
        <Hero />
        <WhyChoose />
        <Statistics stats={stats} />
        <Testimonials />
      </main>
    </div>
  );
}
