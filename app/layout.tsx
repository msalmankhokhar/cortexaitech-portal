import type { Metadata } from "next";
import { Manrope as Font } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/Context/ThemeContext";
import PageLoadingProvider from "@/Context/LoadingContext";
import AuthProvider from "@/Context/AuthContext";

const font = Font({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: "Cortex AI Tech Online Portal",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" data-mode={'light'}>
      <body className={`${font.className} antialiased`}>

        <PageLoadingProvider>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </PageLoadingProvider>

      </body>
    </html>
  );
}
