import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Fjalla_One } from "next/font/google";
import React from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale, routing } from '@/i18n/routing';
import { NavbarController } from "@/components/ui/navbar-controller";
import { WishlistProvider } from "@/components/providers/wishlist-provider";
import { NavbarProvider } from "@/components/providers/navbar-provider";
import "./globals.css";

const fjallaOne = Fjalla_One({
  variable: "--font-fjalla-one",
  subsets: ["latin"],
  weight: "400"
});


export const metadata: Metadata = {
  title: "Flavar Jaya",
  description: "Restaurant ordering app",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  }
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${fjallaOne.variable} antialiased bg-app-background`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NavbarProvider>
            <WishlistProvider>
              {children}
              <NavbarController />
            </WishlistProvider>
          </NavbarProvider>
        </NextIntlClientProvider>
      </body >
    </html >
  );
}
