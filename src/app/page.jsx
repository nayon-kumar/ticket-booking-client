import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
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
      </main>
    </div>
  );
}
