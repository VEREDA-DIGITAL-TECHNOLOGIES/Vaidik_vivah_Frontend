import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";


export const metadata: Metadata = {
  title: "VaidikVivah",
  description: "This is metromonial website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className=" overflow-x-hidden">
         <Navbar />
        {children}
         <Footer/>
        </div>
        </body>
    </html>
  );
}
