import { type PropsWithChildren } from "react";
import type { Metadata } from "next";

// Components
import { MoseyBankHeader } from "@/components/header";
import { MoseyBankFooter } from "@/components/footer";
import { ThemeProvider, Body } from "@/components/theme";
import Script from "next/script";
// Styling
import { Figtree } from "next/font/google";
import "./globals.scss";

{
  /* <Script
crossorigin
type="module"
src={"https://static.cloud.coveo.com/headless/v2.74/headless.js"}
></Script>
<Script
crossorigin
type="module"
src={"https://static.cloud.coveo.com/atomic/v2.74/atomic.esm.js"}
></Script>
<Script
crossorigin
type="module"
src={
  "https://static.cloud.coveo.com/atomic-react/v2.12/iife/atomic-react.min.js"
}
></Script> */
}

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "An Optimizely demo website",
  keywords: "Mosey bank, Mosey, Optimizely, Demo",
  title: {
    default: "Mosey Bank - An Optimizely Demo",
    template: "%s - An Optimizely Demo",
  },
};

type RootLayoutProps = Readonly<PropsWithChildren<{}>>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <ThemeProvider value={{ theme: "system" }}>
        <Body
          className={`${figtree.className} bg-ghost-white text-vulcan dark:bg-vulcan dark:text-ghost-white`}
        >
          <div className="flex min-h-screen flex-col justify-between">
            <MoseyBankHeader />
            {children}
            <MoseyBankFooter />
          </div>
        </Body>
      </ThemeProvider>
    </html>
  );
}
