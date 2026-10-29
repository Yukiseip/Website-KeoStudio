import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PriceList from "@/components/PriceList";
import BookingWizard from "@/components/BookingWizard";
import ReviewMarquee from "@/components/ReviewMarquee";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <PriceList />
        <Suspense
          fallback={
            <div className="py-24 text-center text-sm text-zinc-500">
              Cargando motor de reservaciones...
            </div>
          }
        >
          <BookingWizard />
        </Suspense>
        <ReviewMarquee />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
