import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "The Reading Engineer",
  description: "A platform for fiction stories, reviews, and deep-dive analysis.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main className="animate-fade-in" style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
