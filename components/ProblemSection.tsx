"use client";

import { motion } from "framer-motion";
import { Lightbulb, Zap, Flame, Globe, Cloud, DollarSign, Moon } from "lucide-react";

const harms = [
    {
        icon: Flame,
        color: "bg-red-50 text-red-600",
        title: "Natural Gas Emissions",
        body: "Most Canadian homes rely on natural gas for heat. Burning it releases CO₂ and methane, potent greenhouse gases that drive climate change and worsen air quality.",
    },
    {
        icon: Zap,
        color: "bg-yellow-50 text-yellow-600",
        title: "Wasted Energy",
        body: "A lot of homes use more heat than they actually need, especially overnight. Across millions of homes, that wasted energy adds up fast.",
    },
    {
        icon: Cloud,
        color: "bg-sky-50 text-sky-600",
        title: "Air Quality Effects",
        body: "Emissions from heating systems contribute to local air pollution, which can affect respiratory health and overall air quality in communities.",
    },
];

const benefits = [
    {
        icon: DollarSign,
        color: "bg-green-50 text-green-600",
        title: "Lower Energy Bills",
        body: "Using a simple overnight schedule can reduce heating costs and save energy.",
    },
    {
        icon: Moon,
        color: "bg-slate-50 text-slate-600",
        title: "Improve Sleep Quality",
        body: "A cooler room can help you fall asleep faster and improve comfort throughout the night.",
    },
    {
        icon: Globe,
        color: "bg-teal-50 text-teal-600",
        title: "Small Change, Big Impact",
        body: "The amount of energy it takes to raise the temperature of a house increases exponentially. Small temperature changes really make a difference. If every household made this simple change, the collective reduction in energy use would be massive.",
    }
]


function Card({ icon: Icon, color, title, body, index }: {
    icon: React.ElementType;
    color: string;
    title: string;
    body: string;
    index: number;
}) {
    return (
        <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-400"
        >
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-5`}>
               <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-dark mb-3">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
        </motion.div>
    );
}

export default function ProblemSection() {
    return (
        <section id="problem" className="py-24 px-6 md:px-12 bg-bg">
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
                    <h2 className="text-3xl md:text-5xl font-bold text-dark mt-3 tracking-tight leading-tight">
                        Why Does Heating Matter So Much?
                    </h2>
                    <p className="text-gray-500 mt-5 text-lg leading-relaxed">
                        Canada's climate means it takes a lot of energy to keep homes warm, especially during our long winters. 
                        That energy use has a real cost, to our wallets and the planet.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {harms.map((point, i) => <Card key={i} {...point} index={i}/>)}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="my-12 bg-linear-to-r from-dark to-[#14533B] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6"
                >
                    <div className="flex-1">
                        <p className="text-emerald-400 text-sm font-medium uppercase tracking-wider mb-2">Our Solution</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                            Program Your Thermostat. Save Energy. Sleep Better.
                        </h3>
                        <p className="text-white/60 mt-3 leading-relaxed">
                            Most homes already have programmable thermostats, but many people don't know how to use them. 
                            Configure your thermostat to lower the temperature at night by just a few degrees, and you can save energy, reduce emissions, and even improve your sleep quality.
                            One or two degrees really makes a difference.
                            We're educating Canadian families on how to do exactly this.
                        </p>
                    </div>
                    <div className="shrink-0 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
                        <p className="text-5xl font-bold text-emerald-300">2-10%</p>
                        <p className="text-white/50 text-sm mt-1">annual heating savings</p>
                        <p className="text-white/30 text-xs mt-1">by using thermostat scheduling</p>
                    </div>
                </motion.div>
                

                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((point, i) => <Card key={i} {...point} index={i}/>)}
                </div>
            </div>
        </section>
    );
}