import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/AppProviders";
import { WhatsAppButtonFloater } from "@/components/ui/whatsapp-button-floater";
import { ChatbotPopover } from "@/components/ui/chatbot-popover";
import "./globals.css";
import { nunito, dmSans } from "@/configs/font";
import { siteConfig } from "@/configs/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    locale: 'en_US',
    siteName: 'MedVax',
    images: [
      {
        url: '/assets/medvax-e-pharmacy-inscription.png',
        width: 1200,
        height: 630,
        alt: 'MedVax - Healthcare Made Simple',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/assets/medvax-e-pharmacy-inscription.png'],
  },
  metadataBase: 'https://medvaxhealth.com',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${dmSans.variable} antialiased`}
        style={{ fontFamily: "var(--font-nunito), sans-serif" }}
      >
        <AppProviders>
          {children}
          <WhatsAppButtonFloater />
          <ChatbotPopover />
        </AppProviders>
      </body>
    </html>
  );
}
