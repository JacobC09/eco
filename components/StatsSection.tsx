"use client";

import { motion } from "framer-motion";

const stats = [
    {
        value: "64%",
        label: "of home energy use in Canada goes to space heating",
        source: "Natural Resources Canada",
        color: "from-orange-400 to-red-400",
    },
    {
        value: "14M+",
        label: "Canadian homes already have programmable thermostats",
        source: "Statistics Canada",
        color: "from-emerald-400 to-teal-400",
    },
    {
        value: "$50-$100",
        label: "average yearly savings from smarter heating schedules per household",
        source: "Hydro One / Enbridge estimates",
        color: "from-blue-400 to-indigo-400",
    },
    {
        value: "2°C",
        label: "overnight temperature setback that can cut heating use by up to 5%",
        source: "Natural Resources Canada",
        color: "from-purple-400 to-pink-400",
    },
    {
        value: "4.9 Mt",
        label: "of CO₂ emissions could be reduced annually with optimized home heating",
        source: "Canadian Climate Institute",
        color: "from-teal-400 to-emerald-400",
    },
    {
        value: "15-19°C",
        label: "recommended indoor range for sleep comfort and energy efficiency",
        source: "Sleep Foundation / EPA",
        color: "from-sky-400 to-blue-400",
    },
];

export default function StatsSection() {
    return (
        <section className="py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-emerald-600 text-sm font-medium tracking-[0.2em] uppercase">
                        By The Numbers
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold  text-dark mt-3 tracking-tight">
                        The Impact Is Real
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-lg mx-auto leading-relaxed">
                        These aren't projections — they're what happens when communities commit to smarter heating habits.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-bg rounded-3xl p-8 border border-gray-100 hover:border-emerald-100 hover:shadow-md transition-all duration-300 group"
                        >
                            <div className={`text-3xl md:text-4xl font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                                {stat.value}
                            </div>
                            <p className="text-dark font-medium leading-snug mb-3">{stat.label}</p>
                            <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">Source: {stat.source}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}