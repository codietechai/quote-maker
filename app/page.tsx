import Navigation from "@/components/common/navbar";
import FeaturedProjects from "@/components/home/featured-projects";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";

export const metadata = {
  title: "Alex Designer - Creative Graphic Designer & Brand Strategist",
  description:
    "Professional graphic designer specializing in brand identity, web design, and creative solutions. View my portfolio and let's create something amazing together.",
};

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <FeaturedProjects />
      <Footer />
    </main>
  );
}
