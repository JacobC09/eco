"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Star, DollarSign, Zap, ChevronDown } from "lucide-react";

const thermostats = [
    {
        brand: "Honeywell",
        model: "X2S Smart Thermostat",
        type: "Programmable (Basic)",
        price: "$80 CAD",
        priceLevel: 1,
        energySaving: 3,
        badge: "Most Affordable",
        badgeColor: "bg-green-100 text-green-700 border-green-200",
        image: "https://www.honeywellhome.com/cdn/shop/files/RTH2CWF-c7-6.jpg?v=1774199392&width=1500",
        features: [
            "7-day programming",
            "Large backlit display",
            "No Wi-Fi required",
            "Works without C-wire in many systems"
        ],
        difficulty: "Easy",
        diffColor: "bg-emerald-50 text-emerald-700",
        steps:
            "MENU → SCHEDULE → Select day → Set SLEEP temp → Adjust to ~18°C → DONE",
        link: "https://www.honeywellhome.com/products/x2s-smart-thermostat?variant=43065187172454",
        description:
            "Reliable no-frills programmable thermostat. No app or smart features—ideal for basic energy savings."
    },

    {
        brand: "Google Nest",
        model: "Nest Learning Thermostat (4th Gen)",
        type: "Smart (Learning)",
        price: "~$250-350 CAD",
        priceLevel: 4,
        energySaving: 4,
        badge: "Best Overall Smart",
        badgeColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
        image:
            "https://m.media-amazon.com/images/I/61H5r0Y+CuL._AC_UF1000,1000_QL80_.jpg",
        features: [
            "Learns schedule automatically",
            "Remote app control (Google Home / Nest app)",
            "Energy history reports",
            "Works with most 24V HVAC systems"
        ],
        difficulty: "Easy",
        diffColor: "bg-emerald-50 text-emerald-700",
        steps:
            "Google Home App → Thermostat → Schedule → Add Sleep (18°C) → Add Wake (21°C) → Save",
        link: "https://store.google.com/product/nest_learning_thermostat_3rd_gen",
        description:
            "The most polished learning thermostat. Automatically adapts to your routine and optimizes energy use."
    },

    {
        brand: "Ecobee",
        model: "Smart Thermostat Premium",
        type: "Smart + Room Sensors",
        price: "~$250-330 CAD",
        priceLevel: 4,
        energySaving: 5,
        badge: "Best Comfort Control",
        badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
        image:
            "https://images.homedepot.ca/productimages/p_1001689332.jpg?product-images=l",
        features: [
            "Includes SmartSensor for rooms",
            "Occupancy-based heating control",
            "Built-in air quality sensor",
            "Alexa / Siri support"
        ],
        difficulty: "Easy",
        diffColor: "bg-emerald-50 text-emerald-700",
        steps:
            "Ecobee App → Comfort Settings → Sleep → Set 18°C → Morning → 21°C → Save",
        link: "https://www.ecobee.com/en-ca/smart-thermostats/smart-thermostat-premium/",
        description:
            "Best at balancing temperatures across rooms using sensors. Strongest comfort-focused smart thermostat."
    },

    // {
    //     brand: "Emerson",
    //     model: "Sensi ST55 Smart Thermostat",
    //     type: "Smart (Mid-Range)",
    //     price: "~$120-180 CAD",
    //     priceLevel: 2,
    //     energySaving: 4,
    //     badge: "Best Value Smart",
    //     badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    //     image:
    //         "https://i.ebayimg.com/images/g/FrIAAOSwMi1kb518/s-l1200.jpg",
    //     features: [
    //         "App-based scheduling",
    //         "Works with Alexa & Google",
    //         "Simple installation",
    //         "No mandatory subscription"
    //     ],
    //     difficulty: "Easy",
    //     diffColor: "bg-emerald-50 text-emerald-700",
    //     steps:
    //         "Sensi App → Schedule → Set Sleep → 18°C → Set Wake → 21°C → Save",
    //     link: "https://sensi.emerson.com/en-ca",
    //     description:
    //         "Affordable smart thermostat with strong reliability and simple app control."
    // },
];


export default function ThermostatList() {
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <section id="thermostats" className="py-24 px-6 md:px-12 bg-bg">
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
                    <h2 className="text-3xl md:text-5xl font-bold text-dark mt-3 tracking-tight">
                        Common Thermostat Models
                    </h2>
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
                                    <h3 className="text-base font-bold text-dark leading-snug mb-3">{t.model}</h3>

                                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{t.description}</p>

                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="font-medium">{t.price}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Zap className="w-3 h-3 text-amber-400" />
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <Star key={i} className={`w-3 h-3 ${i <= t.energySaving ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
                                                ))}
                                            </div>
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
                                        <p className="text-sm text-dark leading-relaxed">{t.steps}</p>
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