"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="py-32 px-6 md:px-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-[#0A2F1F] via-[#0F3D2A] to-[#0A2F1F]" />

            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full border border-emerald-500/10" />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full border border-emerald-500/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-emerald-500/5" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8">
                        <Heart className="w-8 h-8 text-emerald-400" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
                        Tonight,
                        <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-teal-200">
                            Turn It Down
                        </span>
                    </h2>

                    <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg mx-auto">
                        Program your thermostat tonight. Share this page with your neighbours.
                        Together, small habits add up to national-scale climate impact.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#calculator">
                            <Button
                                className="bg-emerald-500 hover:bg-emerald-400 text-[#0A2F1F] font-semibold rounded-full px-10 h-14 text-base transition-all hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                            >
                                Calculate My Savings
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </a>
                        <a href="#thermostats">
                            <Button
                                className="border-white/30 text-white hover:bg-white/10 rounded-full px-10 h-14 text-base"
                            >
                                Find My Thermostat
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}