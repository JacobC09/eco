"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Users, MapPin } from "lucide-react";
import { fetchEntries, addEntry, SheetEntry } from "@/lib/sheets";

function calcCommunityCO2(entries: SheetEntry[]): number {
    // Estimate ~2.5 tons CO2 saved per person per year with thermostat optimization
    return entries.length * 2500;
}

export default function CommunityPledge() {
    const [form, setForm] = useState({ name: "", city: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [entries, setEntries] = useState<SheetEntry[] | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadEntries = async () => {
            try {
                setEntries(await fetchEntries());
            } catch (error) {
                console.error("Error loading entries:", error);
                setEntries([]);
            }
        };

        loadEntries();
    }, [submitted]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        
        setIsSubmitting(true);
        try {
            const success = await addEntry(form);
            
            if (success) {
                setSubmitted(true);
                const updatedEntries = await fetchEntries();
                setEntries(updatedEntries);
                setTimeout(() => {
                    setSubmitted(false);
                    setForm({ name: "", city: "", message: "" });
                }, 2000);
            }
        } catch (error) {
            console.error("Error submitting entry:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <h2 className="text-3xl md:text-5xl font-bold text-dark mt-3 tracking-tight">What Is Our Community Doing?</h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
                        Tell us what action you've taken. We're tracking community impact in real time.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-bg rounded-3xl border border-gray-100 p-8"
                    >
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark mb-2">Thank You!</h3>
                                    <p className="text-gray-500 text-sm">Your action has been added to the community tracker.</p>
                                    <button onClick={() => { setSubmitted(false); setForm({ name: "", city: "", message: "" }); }} className="mt-6 text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
                                        Submit Another Action
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                                    <h3 className="text-lg font-bold text-dark">Share Your Action</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Name *</label>
                                            <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Jake C." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-400 bg-white" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">City</label>
                                            <input value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} placeholder="e.g. Oakville" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-400 bg-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Message (optional)</label>
                                        <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="e. g. I purchased a smart thermostat and lowered my energy bill by 20%!" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-400 bg-white resize-none" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
                                        {isSubmitting ? "Submitting..." : "Submit My Action"}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <Users className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="font-bold text-dark">Recent Community Actions</p>
                                <p className="text-xs text-gray-400">
                                    {(entries === undefined) ? "Loading..." : (entries || []).length > 0 ? `${(entries || []).length} real entries` : "Sample community entries"}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-130 overflow-y-auto pr-1">
                            {(entries === undefined) ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <div key={`skeleton-${i}`} className="bg-bg rounded-2xl border border-gray-100 p-4 animate-pulse">
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-24" />
                                                <div className="h-3 bg-gray-200 rounded w-full" />
                                                <div className="h-3 bg-gray-200 rounded w-32" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                entries.length === 0 ? <p className="text-gray-400">No entries yet. Stay tuned!</p> : (
                                    entries.slice(0, 8).map((entry, i) => (
                                        <motion.div
                                            key={entry.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-bg rounded-2xl border border-gray-100 p-4"
                                        >
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 text-sm font-bold text-white shadow-sm">
                                                    {entry.name?.[0]?.toUpperCase() || "?"}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                                        <p className="font-semibold text-sm text-dark">{entry.name}</p>
                                                        {entry.city && (
                                                            <span className="flex items-center gap-0.5 text-xs text-gray-400">
                                                                <MapPin className="w-3 h-3" />{entry.city}
                                                            </span>
                                                        )}
                                                        {entry.date && <span className="text-xs text-gray-300">{entry.date}</span>}
                                                    </div>
                                                    {entry.message && <p className="text-xs text-gray-500 leading-relaxed">{entry.message}</p>}
                                                </div>
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                            </div>
                                        </motion.div>
                                    ))
                                )
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}