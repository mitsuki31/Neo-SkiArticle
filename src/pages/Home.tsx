import RootLayout from "@/layout/Root";
import HomeLayout from "@/layout/Home";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function Home() {
  return (
    <RootLayout title="Beranda · NeoSKI">
      <Header className="bg-none bg-transparent" sticky />
      <HomeLayout />
      <Footer />
    </RootLayout>
  );
}
