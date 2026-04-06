"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Users, Thermometer, Leaf, Zap, MapPin } from "lucide-react";

const actions = [
    "I programmed my thermostat to lower at night",
    "I shared this page with a neighbour or friend",
    "I convinced my family to lower the heat at night",
    "I set up a vacation mode for my trip",
    "I set up automatic scheduling on my phone",
];

// Mock entries shown when no real data exists yet
const MOCK_ENTRIES = [
    { id: "m1", name: "Sarah M.", city: "Toronto", action: "I programmed my thermostat to lower at night", setback: 3, message: "Super easy with the Nest app, took 2 minutes!", date: "Feb 24" },
    { id: "m2", name: "David K.", city: "Ottawa", action: "I convinced my family to lower the heat at night", setback: 2, message: "We're saving about $15/month already.", date: "Feb 23" },
    { id: "m3", name: "Priya T.", city: "Vancouver", action: "I set up a vacation mode for my trip", setback: 8, message: "Set it to 13°C for our spring break trip!", date: "Feb 22" },
    { id: "m4", name: "Liam B.", city: "Calgary", action: "I shared this page with a neighbour", setback: 2, message: "Shared with 3 neighbours on my street.", date: "Feb 21" },
    { id: "m5", name: "Emma R.", city: "Montreal", action: "I set up automatic scheduling on my phone", setback: 4, message: "Used the Ecobee app — incredibly easy.", date: "Feb 20" },
];

function calcCommunityCO2(pledges: any[], mockEntries: any[]) {
    const all = pledges.length > 0 ? pledges : mockEntries;
    // Each entry: ~4500 kg CO2/yr baseline * (setback/100)*efficiency
    // Simplified: each degree setback for ~8hrs saves ~0.7% → annual CO2
    let totalKg = 0;
    all.forEach(p => {
        const setback = typeof p.setback === "number" ? p.setback : parseFloat(p.message?.match(/Set back: ([\d.]+)/)?.[1] || "2");
        totalKg += (setback * 0.007 * (8 / 24)) * 4500;
    });
    return Math.round(totalKg);
}

export default function CommunityPledge() {
    const [form, setForm] = useState({ name: "", city: "", action: actions[0], temp_setback: 2, message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        setSubmitted(true);
    };

    const pledges = [];

    const displayEntries = MOCK_ENTRIES;
    const totalCO2 = calcCommunityCO2([], MOCK_ENTRIES);
    const totalPeople = MOCK_ENTRIES.length;
    const totalDollars = Math.round(totalPeople * 90);

    return (
        <section id="community" className="py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <span className="text-emerald-600 text-sm font-medium tracking-[0.2em] uppercase">Community Tracker</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0A2F1F] mt-3 tracking-tight">What Is Our Community Doing?</h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
                        Tell us what action you've taken. We're tracking community impact in real time.
                    </p>
                </motion.div>

                {/* Community totals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
                >
                    {[
                        { icon: Users, value: totalPeople, label: "Actions Taken", suffix: "" },
                        { icon: Zap, value: totalCO2.toLocaleString(), label: "kg CO₂ Avoided", suffix: "" },
                        { icon: Leaf, value: `$${totalDollars.toLocaleString()}`, label: "Est. Money Saved", suffix: "" },
                    ].map((s) => (
                        <div key={s.label} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                            <s.icon className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-[#0A2F1F]">{s.value}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                        </div>
                    ))}
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#FAFAF7] rounded-3xl border border-gray-100 p-8"
                    >
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0A2F1F] mb-2">Thank You!</h3>
                                    <p className="text-gray-500 text-sm">Your action has been added to the community tracker.</p>
                                    <button onClick={() => { setSubmitted(false); setForm({ name: "", city: "", action: actions[0], temp_setback: 2, message: "" }); }} className="mt-6 text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
                                        Submit Another Action
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                                    <h3 className="text-lg font-bold text-[#0A2F1F]">Share Your Action</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Name *</label>
                                            <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Sarah M." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-400 bg-white" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">City</label>
                                            <input value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} placeholder="e.g. Toronto" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-400 bg-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">What Did You Do?</label>
                                        <select value={form.action} onChange={e => setForm(p => ({ ...p, action: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-400 bg-white">
                                            {actions.map(a => <option key={a} value={a}>{a}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                                            Temperature Setback: <span className="text-emerald-600">{form.temp_setback}°C lower</span>
                                        </label>
                                        <input type="range" min={1} max={8} step={0.5} value={form.temp_setback} onChange={e => setForm(p => ({ ...p, temp_setback: parseFloat(e.target.value) }))} className="w-full accent-emerald-600" />
                                        <div className="flex justify-between text-xs text-gray-300 mt-1"><span>1°C</span><span>8°C</span></div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Message (optional)</label>
                                        <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Any tips for the community..." rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-400 bg-white resize-none" />
                                    </div>
                                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
                                        Submit My Action →
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Activity feed */}
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <Users className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="font-bold text-[#0A2F1F]">Recent Community Actions</p>
                                <p className="text-xs text-gray-400">{pledges.length > 0 ? `${pledges.length} real entries` : "Sample community entries"}</p>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-130 overflow-y-auto pr-1">
                            {displayEntries.slice(0, 8).map((entry, i) => (
                                <motion.div
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-[#FAFAF7] rounded-2xl border border-gray-100 p-4"
                                >
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 text-sm font-bold text-white shadow-sm">
                                            {entry.name?.[0]?.toUpperCase() || "?"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <p className="font-semibold text-sm text-[#0A2F1F]">{entry.name}</p>
                                                {entry.city && (
                                                    <span className="flex items-center gap-0.5 text-xs text-gray-400">
                                                        <MapPin className="w-3 h-3" />{entry.city}
                                                    </span>
                                                )}
                                                {entry.date && <span className="text-xs text-gray-300">{entry.date}</span>}
                                            </div>
                                            <p className="text-xs text-emerald-700 font-medium mb-1">{entry.action}</p>
                                            {entry.message && <p className="text-xs text-gray-500 leading-relaxed italic">"{entry.message}"</p>}
                                            <div className="flex items-center gap-1 mt-2">
                                                <Thermometer className="w-3 h-3 text-emerald-500" />
                                                <span className="text-xs text-emerald-600 font-medium">{entry.setback}°C setback</span>
                                                <span className="text-xs text-gray-300 ml-1">≈ {Math.round(entry.setback * 0.007 * 4500 * 8 / 24)} kg CO₂/yr saved</span>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}