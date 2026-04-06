"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Thermometer, ChevronDown, Flame, Leaf, TrendingDown } from "lucide-react";

const navSections = [
    { label: "The Problem", href: "#problem" },
    { label: "Statistics", href: "#stats" },
    { label: "Thermostats", href: "#thermostats" },
    { label: "Calculator", href: "#calculator" },
    { label: "Sleep Science", href: "#sleep" },
    { label: "Videos", href: "#tutorials" },
    { label: "Community", href: "#community" },
];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Parallax background */}
            <motion.div className="absolute inset-0" style={{ y: bgY }}>
                <img
                    src="https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920&q=80"
                    alt="Winter nature landscape"
                    className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#0A2F1F]/95 via-[#0A2F1F]/80 to-[#0A2F1F]/55" />
                <div className="absolute inset-0 bg-[#0A2F1F]/40" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0A2F1F]/70 via-transparent to-transparent" />
            </motion.div>

        
            <motion.div
                style={{ opacity }}
                className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 flex-1 flex flex-col justify-center"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="max-w-2xl"
                >
                    {/* Tag */}
                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
                        <motion.div
                            className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/30"
                            animate={{ boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 20px rgba(16,185,129,0.3)", "0 0 0px rgba(16,185,129,0)"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Thermometer className="w-5 h-5 text-emerald-400" />
                        </motion.div>
                        <div>
                            <span className="text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase block">Smart Thermostat Initiative</span>
                            <span className="text-white/40 text-xs">A Canadian Eco-Club School Project</span>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 variants={itemVariants} className="text-6xl md:text-[6.5rem] font-bold text-white leading-none tracking-tight mb-6">
                        Small
                        <br />
                        <motion.span
                            className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-teal-200 to-emerald-300"
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            style={{ backgroundSize: "200% 200%" }}
                        >
                            Change.
                        </motion.span>
                        <br />
                        <span className="text-white/90">Big Impact.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/65 leading-relaxed mb-3 max-w-xl">
                        Heating accounts for <strong className="text-white/90">63% of Canadian home energy use</strong>.
                        By programming your thermostat to lower at night, you save money, sleep better, and fight climate change — all at once.
                    </motion.p>

                    <motion.p variants={itemVariants} className="text-sm text-white/40 mb-10 max-w-lg">
                        Most homes already have a programmable thermostat — most families just don't know how to use it. We're changing that.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-16">
                        <a href="#problem">
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                className="bg-emerald-500 hover:bg-emerald-400 text-[#0A2F1F] font-bold rounded-full px-8 py-3.5 text-sm transition-colors shadow-lg shadow-emerald-500/20"
                            >
                                Learn Why It Matters ↓
                            </motion.button>
                        </a>
                        <a href="#calculator">
                            <motion.button whileTap={{ scale: 0.97 }} className="border border-white/25 text-white hover:bg-white/10 rounded-full px-8 py-3.5 text-sm transition-all font-medium">
                                Calculate My Savings
                            </motion.button>
                        </a>
                        <a href="#thermostats">
                            <motion.button whileTap={{ scale: 0.97 }} className="border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 rounded-full px-8 py-3.5 text-sm transition-all font-medium">
                                Find My Thermostat
                            </motion.button>
                        </a>
                    </motion.div>

                    {/* Stat chips */}
                </motion.div>
            </motion.div>

            {/* Scroll cue */}
            {/* <motion.div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-white/25 text-xs tracking-widest uppercase">Scroll</span>
                <ChevronDown className="w-5 h-5 text-white/30" />
            </motion.div> */}

            {/* Wave SVG transition instead of gradient */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
                    <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FAFAF7" />
                </svg>
            </div>
        </section>
    );
}