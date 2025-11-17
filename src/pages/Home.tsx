import { Helmet, HelmetProvider } from "react-helmet-async";

import HomeLayout from "@/layout/Home";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function Home() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Home · NeoSKI</title>
      </Helmet>
      <div className="bg-white-800 dark:bg-background text-gray-900">
        <Header className="bg-none bg-transparent" />
        <HomeLayout />
        <Footer />
      </div>
    </HelmetProvider>
  );
}
