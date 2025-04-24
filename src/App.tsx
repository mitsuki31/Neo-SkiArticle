import { SpeedInsights } from "@vercel/speed-insights/react";

import Home from "@/pages/Home";
import Header from "@/pages/Header";
import About from "@/pages/About";
import Footer from "@/pages/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Footer />
      <SpeedInsights />
    </>
  );
}
