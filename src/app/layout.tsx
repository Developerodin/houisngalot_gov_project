import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Sindur Vihar - SINDUR VIhar goverment of rajsatahn",
  description: "Government Housing Lottery & Plot Allocation System",
  icons: {
    icon: [
      { url: 'https://rajasthan.gov.in/assets/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://rajasthan.gov.in/assets/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: 'https://rajasthan.gov.in/assets/images/favicon/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: 'https://rajasthan.gov.in/assets/images/favicon/safari-pinned-tab.svg' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="https://rajasthan.gov.in/assets/images/favicon/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" href="https://rajasthan.gov.in/assets/images/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="https://rajasthan.gov.in/assets/images/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="mask-icon" href="https://rajasthan.gov.in/assets/images/favicon/safari-pinned-tab.svg" />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFFFFF', fontFamily: "'Poppins', Arial, Helvetica, sans-serif" }}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

