"use client";

import { motion } from "framer-motion";
import { Flame, AlertTriangle, Lightbulb } from "lucide-react";

const points = [
    {
        icon: Flame,
        color: "bg-orange-50 text-orange-600",
        title: "Heating = #1 Home Energy Use",
        body: "In Canada, space heating accounts for roughly 63% of household energy consumption — more than any other end-use, especially during our long, cold winters.",
    },
    {
        icon: AlertTriangle,
        color: "bg-red-50 text-red-600",
        title: "Natural Gas & GHG Emissions",
        body: "Most Canadian homes rely on natural gas for heat. Burning it releases CO₂ and methane — potent greenhouse gases that drive climate change and worsen air quality.",
    },
    {
        icon: Lightbulb,
        color: "bg-emerald-50 text-emerald-600",
        title: "The Simple Fix Already in Your Home",
        body: "Most homes already have a programmable or smart thermostat installed. The problem? Many families don't know how to use the scheduling features — leaving significant savings on the table every single night.",
    },
];

export default function ProblemSection() {
    return (
        <section id="problem" className="py-24 px-6 md:px-12 bg-[#FAFAF7]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-14"
                >
                    <span className="text-emerald-600 text-sm font-medium tracking-[0.2em] uppercase">
                        The Problem
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0A2F1F] mt-3 tracking-tight leading-tight">
                        Why Does Home Heating Matter So Much?
                    </h2>
                    <p className="text-gray-500 mt-5 text-lg leading-relaxed">
                        Canada's climate means we spend more on heating than almost anywhere else in the world.
                        That energy use has a real cost — for your wallet and for the planet.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {points.map((point, i) => (
                        <motion.div
                            key={point.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
                            className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-400"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${point.color} flex items-center justify-center mb-5`}>
                                <point.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-[#0A2F1F] mb-3">{point.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{point.body}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Solution callout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 bg-linear-to-r from-[#0A2F1F] to-[#14533B] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6"
                >
                    <div className="flex-1">
                        <p className="text-emerald-400 text-sm font-medium uppercase tracking-wider mb-2">Our Solution</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                            Program Your Thermostat. Save Energy. Sleep Better.
                        </h3>
                        <p className="text-white/60 mt-3 leading-relaxed">
                            Lowering the temperature by just 2°C overnight for 8 hours can save up to 5% on your heating bill.
                            We're educating Canadian families on how to do exactly this — for free.
                        </p>
                    </div>
                    <div className="shrink-0 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
                        <p className="text-5xl font-bold text-emerald-300">5–15%</p>
                        <p className="text-white/50 text-sm mt-1">annual heating savings</p>
                        <p className="text-white/30 text-xs mt-1">by using thermostat scheduling</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}