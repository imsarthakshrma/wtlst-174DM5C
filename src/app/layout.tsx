import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const lexend = Lexend({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Kroskod - AI-powered development workspace',
  description: "Empower your development team with Kroskod's unified workspace platform",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.className} antialiased`}
      >
        <GoogleAnalytics gaId="G-PG254C4ZXP" />
        {children}
      </body>
    </html>
  );
}
