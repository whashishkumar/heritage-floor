import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/NavBar";
import { AuthProvider } from "@/context/userAuthContext";
import { Providers } from "@/store/providers";

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});

const inter = localFont({
  src: "../public/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const roboto = localFont({
  src: "../public/fonts/Roboto-VariableFont_wdth,wght.ttf",
  variable: "--font-roboto",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Heritage Floors And Homes",
  description:
    "Heritage Floor and Home offers premium flooring and home improvement products designed to enhance your space with quality, style, and long-lasting durability. Shop top floors and home essentials online",
  robots: {
    index: false,
  },
  icons: {
    icon: "/logo/heritage.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}  ${poppins.variable}  ${inter.variable} antialiased `}>
        <AuthProvider>
          <Providers>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
