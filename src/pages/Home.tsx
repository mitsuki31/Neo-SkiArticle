import RootLayout from "@/components/layout/Root";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeLayout from "@/layouts/HomeLayout";

export default function Home() {
  return (
    <RootLayout title="NeoSKI — Website Artikel Modern SMK Sukamandi">
      <Header className="bg-none bg-transparent" sticky scrollThreshold={0} />
      <HomeLayout />
      <Footer />
    </RootLayout>
  );
}
