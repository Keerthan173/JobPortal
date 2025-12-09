import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavbarWrapper from "@/components/NavbarWrapper";
import Providers from "./providers";
import UserLoader from "@/components/UserLoader";
import "./globals.css";
export const metadata = {
  title: "Your App",
  description: "App description",
};
export default function RootLayout({ children }) {
  /*
  children → renders the content of whatever page is currently being viewed.

  Flow:
  Browser requests / → Next.js loads layout.js → inserts page.js content in <main> → shows Navbar + Homepage content + Footer.
  */

  return (
    <html lang="en">
      <body>
        <Providers>
          <UserLoader />
          <NavbarWrapper />
          <main>{children}</main>
          {/* <Footer/> */}
        </Providers>
      </body>
    </html>
  );
}
