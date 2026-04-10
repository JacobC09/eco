"use client";

import { motion } from "framer-motion";
import { Plane, Snowflake, Shield, ThumbsUp, Thermometer } from "lucide-react";

const tips = [
    {
        icon: Thermometer,
        title: "Set It Low, Not Off",
        desc: "Don't turn your heat completely off in winter — pipes can freeze. Set it to 12-15°C (55-60°F) to protect your home while minimizing energy use.",
        color: "text-blue-600 bg-blue-50",
    },
    {
        icon: Shield,
        title: "Protect Your Pipes",
        desc: "Temperatures below 12°C risk freezing pipes, especially in uninsulated areas like basements or garages. Your vacation setpoint should never go lower than this.",
        color: "text-orange-600 bg-orange-50",
    },
    {
        icon: Snowflake,
        title: "Smart Thermostats Handle It Automatically",
        desc: "Nest, Ecobee, and most Wi-Fi thermostats have a built-in 'Away' or 'Vacation' mode. You can set exact dates and the thermostat switches automatically — no manual adjusting needed.",
        color: "text-emerald-600 bg-emerald-50",
    },
    {
        icon: ThumbsUp,
        title: "Schedule Your Return Warmth",
        desc: "Most smart thermostats let you schedule a warm-up period before you arrive home. Set it to reach your comfortable temperature 2 hours before your return — you'll never step into a cold house.",
        color: "text-purple-600 bg-purple-50",
    },
];

const savings = [
    { label: "Weekend trip (2 days)", days: 2, savings: "~$3-8" },
    { label: "Spring break (7 days)", days: 7, savings: "~$10-28" },
    { label: "Summer vacation (14 days)", days: 14, savings: "~$20-56" },
    { label: "Holiday travel (10 days)", days: 10, savings: "~$14-40" },
];

export default function VacationSection() {
    return (
        <section id="vacation" className="py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-emerald-600 text-sm font-medium tracking-[0.2em] uppercase">
                            Bonus Tip
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 tracking-tight leading-tight">
                            Don't Forget to Save <br />When You're Away
                        </h2>
                        <p className="text-gray-500 mt-4 leading-relaxed">
                            Nightly setbacks are powerful — but vacation setbacks are even bigger wins. Every day your home is empty and heated to full temperature is pure wasted energy.
                        </p>
                        <p className="text-gray-500 mt-3 leading-relaxed">
                            The rule is simple: <strong className="text-dark">lower the heat, not off.</strong> Keep it between 12-15°C to protect your home, save money, and reduce emissions — all while you're away.
                        </p>

                        <div className="mt-8 bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <Plane className="w-4 h-4 text-emerald-600" />
                                <p className="font-semibold text-emerald-800 text-sm">Estimated Vacation Savings</p>
                            </div>
                            <p className="text-emerald-700 text-xs mb-4">Based on avg. Canadian home at 13°C vacation setpoint vs. 21°C normal:</p>
                            <div className="space-y-2">
                                {savings.map(s => (
                                    <div key={s.label} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">{s.label}</span>
                                        <span className="text-sm font-bold text-emerald-700">{s.savings}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
                            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">✈️ Recommended Vacation Setpoint</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-blue-700">12-15°C</span>
                                <span className="text-blue-500 text-sm">(55-60°F)</span>
                            </div>
                            <p className="text-blue-600 text-xs mt-2">Safe from pipe freezing · Minimal energy waste · Warm again before you're back</p>
                        </div>
                    </motion.div>

                    {/* Right: Tips */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">What You Need To Know</p>
                        {tips.map((tip, i) => (
                            <motion.div
                                key={tip.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                className="bg-bg border border-gray-100 rounded-2xl p-5 flex gap-4 transition-shadow hover:shadow-md"
                            >
                                <div className={`w-10 h-10 rounded-xl ${tip.color} flex items-center justify-center shrink-0`}>
                                    <tip.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-dark text-sm mb-1">{tip.title}</p>
                                    <p className="text-gray-500 text-xs leading-relaxed">{tip.desc}</p>
                                </div>
                            </motion.div>
                        ))}

                        <div className="bg-linear-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 text-white">
                            <p className="font-semibold mb-1 text-sm">💡 Most Smart Thermostats Do This Automatically</p>
                            <p className="text-white/75 text-xs leading-relaxed">
                                Nest has "Home/Away Assist," Ecobee has "Smart Home & Away," and most Wi-Fi thermostats
                                have a Vacation or Holiday mode. You just set the dates and it handles everything — including warming your home back up before you arrive.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}