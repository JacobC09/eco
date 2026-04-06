"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Star, DollarSign, Zap, ChevronDown } from "lucide-react";

const thermostats = [
    {
        brand: "Honeywell",
        model: "RTH7560E Programmable",
        type: "Programmable (Basic)",
        price: "~$30–50",
        priceLevel: 1,
        energySaving: 3,
        badge: "💰 Most Affordable",
        badgeColor: "bg-green-100 text-green-700 border-green-200",
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
        features: ["7-day programming", "Large backlit display", "No Wi-Fi needed", "Simple setup"],
        difficulty: "Easy",
        diffColor: "bg-emerald-50 text-emerald-700",
        steps: "Press MENU → SCHEDULE → Select DAY → Navigate to SLEEP period → Set to 18°C using arrows → Press DONE to save.",
        link: "https://www.honeywellhome.com/support",
        description: "The best budget option. No subscription, no app needed — just set it and forget it. Perfect for first-time programmable thermostat users.",
    },
    {
        brand: "Nest",
        model: "Nest Learning Thermostat (4th Gen)",
        type: "Smart (AI-Learning)",
        price: "~$250–300",
        priceLevel: 4,
        energySaving: 5,
        badge: "🏆 Best Overall",
        badgeColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
        features: ["Auto-learns your schedule", "Remote app control", "Saves ~12% on heating", "Geo-fencing auto-away"],
        difficulty: "Easy",
        diffColor: "bg-emerald-50 text-emerald-700",
        steps: "Open Google Home App → Your Thermostat → Schedule → Tap '+' to add a Sleep period → Set 18°C. Add Wake period → Set 21°C. Tap Save.",
        link: "https://support.google.com/googlenest/answer/9248006",
        description: "The gold standard. Learns your habits automatically, reports energy savings monthly, and saves an average of 12% on heating bills — often paying for itself in under 2 years.",
    },
    {
        brand: "Ecobee",
        model: "Ecobee SmartThermostat Premium",
        type: "Smart + Room Sensors",
        price: "~$220–280",
        priceLevel: 4,
        energySaving: 5,
        badge: "🌿 Saves Most Energy",
        badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
        features: ["Room temperature sensors", "Alexa / Siri built-in", "Up to 23% energy savings", "Humidity + air quality"],
        difficulty: "Easy",
        diffColor: "bg-emerald-50 text-emerald-700",
        steps: "Ecobee App → Main Menu → Schedules → Comfort Settings → Night → Set 18°C. Morning → 21°C. Tap Save Schedule.",
        link: "https://support.ecobee.com/en_us/schedule-and-settings",
        description: "The highest energy saver in our list. SmartSensors detect which rooms are occupied, so it only heats where people are. Ecobee claims up to 23% savings vs. a non-programmed thermostat.",
    },
    {
        brand: "Emerson",
        model: "Sensi ST55 Smart Thermostat",
        type: "Smart (Mid-Range)",
        price: "~$100–140",
        priceLevel: 2,
        energySaving: 4,
        badge: "⚖️ Best Value Smart",
        badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a35b2e2e8?w=400&q=80",
        features: ["App scheduling", "Works with Alexa & Google", "Energy usage tracking", "Flexible period setup"],
        difficulty: "Easy",
        diffColor: "bg-emerald-50 text-emerald-700",
        steps: "Sensi App → Schedule → Tap Night period → Set 18°C. Tap Morning → 21°C. Toggle Schedule ON. Done.",
        link: "https://sensi.emerson.com/en-us/support",
        description: "The sweet spot between price and features. Full app control and scheduling at half the cost of Nest or Ecobee. Great for renters or families upgrading for the first time.",
    },
    {
        brand: "Honeywell",
        model: "T6 Pro Programmable",
        type: "Programmable (Mid)",
        price: "~$60–90",
        priceLevel: 2,
        energySaving: 3,
        badge: "🔧 Most Common in Canada",
        badgeColor: "bg-orange-100 text-orange-700 border-orange-200",
        image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&q=80",
        features: ["7-day or 5-1-1 scheduling", "Large touch display", "Universal compatibility", "No Wi-Fi required"],
        difficulty: "Moderate",
        diffColor: "bg-yellow-50 text-yellow-700",
        steps: "Press PROG → Select your days → Arrow to SLEEP period → Set 18°C → Press NEXT for each time slot → DONE to confirm.",
        link: "https://www.honeywellhome.com/support",
        description: "The most widely installed programmable thermostat in Canadian homes. Very likely you already have one. No app or internet needed — pure reliability.",
    },
    {
        brand: "Google Nest",
        model: "Nest Thermostat (Budget)",
        type: "Smart (Entry-Level)",
        price: "~$130–160",
        priceLevel: 3,
        energySaving: 4,
        badge: "📱 Easiest to Set Up",
        badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
        features: ["App setup in 30 min", "Savings Finder tool", "Schedule via Google Home", "Clean minimal display"],
        difficulty: "Very Easy",
        diffColor: "bg-emerald-50 text-emerald-700",
        steps: "Google Home App → Nest Thermostat → Schedule → Add + Sleep event → Set 18°C. Add Wake → 21°C. Save. Enable Schedule.",
        link: "https://support.google.com/googlenest/answer/9247296",
        description: "Google's affordable entry into smart thermostats. The companion app walks you through setup in under 30 minutes with no technical knowledge required.",
    },
];

function PriceDots({ level }: { level: number }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i <= level ? "bg-emerald-500" : "bg-gray-200"}`} />
            ))}
        </div>
    );
}

function EnergyStar({ level }: { level: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`w-3 h-3 ${i <= level ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
            ))}
        </div>
    );
}

export default function ThermostatList() {
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <section id="thermostats" className="py-24 px-6 md:px-12 bg-[#FAFAF7]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-emerald-600 text-sm font-medium tracking-[0.2em] uppercase">
                        Find Yours
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0A2F1F] mt-3 tracking-tight">
                        Common Thermostat Models
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
                        Click any model to get step-by-step setup instructions. We've rated each by price and energy savings potential.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {thermostats.map((t, i) => (
                        <motion.div
                            key={t.model}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                        >
                            <div
                                className={`bg-white rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden ${expanded === i
                                        ? "border-emerald-300 shadow-xl shadow-emerald-50"
                                        : "border-gray-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50"
                                    }`}
                                onClick={() => setExpanded(expanded === i ? null : i)}
                            >
                                {/* Image */}
                                <div className="relative h-44 overflow-hidden bg-gray-100">
                                    <img src={t.image} alt={t.model} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${t.badgeColor}`}>
                                            {t.badge}
                                        </span>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${t.diffColor}`}>
                                            {t.difficulty}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-0.5">{t.brand}</p>
                                    <h3 className="text-base font-bold text-[#0A2F1F] leading-snug mb-3">{t.model}</h3>

                                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{t.description}</p>

                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="font-medium">{t.price}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Zap className="w-3 h-3 text-amber-400" />
                                            <EnergyStar level={t.energySaving} />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 mb-4">
                                        {t.features.map((f) => (
                                            <div key={f} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                <span className="text-xs text-gray-600">{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={`flex items-center justify-between text-xs font-medium transition-colors ${expanded === i ? "text-emerald-600" : "text-gray-400"}`}>
                                        <span>{expanded === i ? "Hide instructions" : "Show setup guide"}</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${expanded === i ? "rotate-180" : ""}`} />
                                    </div>
                                </div>

                                {/* Expanded instructions */}
                                {expanded === i && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="border-t border-emerald-100 bg-emerald-50 p-5"
                                    >
                                        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                                            🌙 Night Schedule Setup
                                        </p>
                                        <p className="text-sm text-[#0A2F1F] leading-relaxed">{t.steps}</p>
                                        <a
                                            href={t.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Official Support Page
                                        </a>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}