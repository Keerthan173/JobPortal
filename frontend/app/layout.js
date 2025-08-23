import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import './globals.css';
export default function RootLayout({ children }) {
  /*
  children → renders the content of whatever page is currently being viewed.

  Flow:
  Browser requests / → Next.js loads layout.js → inserts page.js content in <main> → shows Navbar + Homepage content + Footer.
  */
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
