import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const font = Inter({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Thermostat Awareness Initiative",
    description: "A Generation Green Project helping educate Canadian families on how to optimize their home heating schedules to save energy, reduce emissions, and improve sleep quality.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full", "antialiased", font.variable, font.variable, "font-sans", geist.variable)}
        >
            <body className="min-h-full flex flex-col">
                {children}
                <Footer />
            </body>
        </html>
    );
}
