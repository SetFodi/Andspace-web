import { ScrollAnchors } from "@/components/ScrollAnchors";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { DemoSection } from "@/components/DemoSection";
import { Features } from "@/components/Features";
import { CommandGuardSection } from "@/components/CommandGuardSection";
import { AIHandoffSection } from "@/components/AIHandoffSection";
import { SidebarSection } from "@/components/SidebarSection";
import { CommandPaletteSection } from "@/components/CommandPaletteSection";
import { KeyboardSection } from "@/components/KeyboardSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollAnchors />
      <div id="site-scroll">
        <main className="relative">
          <Hero />
          <DemoSection />
          <Features />
          <CommandGuardSection />
          <AIHandoffSection />
          <SidebarSection />
          <CommandPaletteSection />
          <KeyboardSection />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
