"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Menu, Thermometer, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
    const isHomePage = true;

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-18">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-400">
                            <Thermometer className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-base font-bold tracking-tight text-white">
                            ThermoSmart
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors text-white/60 hover:text-white hover:bg-white/10"
                        >
                            <BookOpen className="w-3.5 h-3.5" />
                            Sources
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}