"use client";

import { motion } from "framer-motion";
import { Moon, Thermometer, Brain, Heart, Zap } from "lucide-react";

const benefits = [
    {
        icon: Brain,
        title: "Better Deep Sleep",
        desc: "A cooler room promotes the drop in core body temperature needed to enter deep, restorative sleep stages. Studies show people fall asleep faster and sleep longer in cool environments.",
        color: "text-purple-600 bg-purple-50",
    },
    {
        icon: Heart,
        title: "Improved Heart Rate",
        desc: "Sleeping cool reduces nighttime heart rate and blood pressure, giving your cardiovascular system a true rest — linked to lower risk of heart disease over time.",
        color: "text-rose-600 bg-rose-50",
    },
    {
        icon: Zap,
        title: "More Energy Next Day",
        desc: "Quality sleep in a cool room leads to higher alertness, better mood, and improved cognitive performance the next morning. Temperature is one of the most overlooked sleep levers.",
        color: "text-amber-600 bg-amber-50",
    },
];

const temps = [
    { label: "Infants", range: "18-20°C", note: "65-68°F", icon: "🍼" },
    { label: "Children", range: "18-21°C", note: "65-70°F", icon: "🧒" },
    { label: "Adults", range: "16-19°C", note: "60-67°F", icon: "🧑" },
    { label: "Seniors", range: "18-21°C", note: "65-70°F", icon: "👴" },
];

export default function SleepTempSection() {
    return (
        <section className="py-24 px-6 md:px-12 bg-linear-to-br from-dark via-[#0e3d27] to-dark relative overflow-hidden">

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Moon className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase">
                            The Science of Sleep
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 tracking-tight">
                        Cool Rooms = Better Sleep
                    </h2>
                    <p className="text-white/50 mt-4 max-w-xl mx-auto leading-relaxed">
                        Science agrees: the optimal sleeping temperature is cooler than most people set their daytime thermostat.
                        Lowering yours at night isn't just good for the planet — it's good for you.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Temperature chart by age */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-6">Recommended Sleep Temperatures</p>
                        <div className="space-y-4">
                            {temps.map((t) => (
                                <div key={t.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-5 hover:bg-white/8 transition-colors">
                                    <span className="text-3xl">{t.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-white font-semibold">{t.label}</p>
                                        <p className="text-white/40 text-sm">{t.note}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-emerald-300">{t.range}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-white/30 text-xs mt-4">Sources: Sleep Foundation, National Sleep Foundation, Canadian Paediatric Society</p>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-5"
                    >
                        {benefits.map((b, i) => (
                            <motion.div
                                key={b.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4"
                            >
                                <div className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center shrink-0`}>
                                    <b.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold mb-1">{b.title}</p>
                                    <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
                                </div>
                            </motion.div>
                        ))}

                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 mt-2">
                            <div className="flex items-center gap-2 mb-2">
                                <Thermometer className="w-4 h-4 text-emerald-400" />
                                <p className="text-emerald-300 font-semibold text-sm">The Double Win</p>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Setting your thermostat 2-3°C lower at night is literally the perfect action —
                                you sleep better <em>and</em> cut your energy use. There's no trade-off. It's just better.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}