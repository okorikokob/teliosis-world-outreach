import { Navbar, Footer } from "../components";
import ScrollResetter from "../_components/ScrollResetter";
import { Toaster } from "sonner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollResetter />
      <Navbar />
      <main>{children}</main>
      <Toaster position="bottom-center" richColors />
      <Footer />
    </>
  );
}
