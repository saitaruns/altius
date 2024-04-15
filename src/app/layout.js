import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/dark-mode";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AltiusHub",
  description: "AltiusHub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="flex items-center justify-between p-4 bg-background/95 border-b ">
            AltiusHub
            <ModeToggle />
          </nav>
          <div className="flex">
            <div className="w-2/12 bg-background border-r h-screen py-3">
              <Link href={"/invoice"} passHref>
                <Button className="w-full" variant="oultine">
                  Invoices
                </Button>
              </Link>
            </div>
            {children}
          </div>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
