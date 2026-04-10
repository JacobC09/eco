"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Home, Clock, Leaf, RefreshCw, DollarSign, Plane, ChevronDown, LucideIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";

type EnergyCalculatorValues = {
    home_size: number;
    setback_temp: number;
    setback_hours: number;
    heating_months: number;
    annual_bill: number;
    vacation_days: number;
    vacation_setpoint: number;
};

type SliderInput = {
    key: keyof EnergyCalculatorValues;
    icon: LucideIcon;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    description: string;
};

const DEFAULTS: EnergyCalculatorValues = {
    home_size: 1800,
    setback_temp: 2,
    setback_hours: 8,
    heating_months: 7,
    annual_bill: 1400,
    vacation_days: 0,
    vacation_setpoint: 13,
};

function calcSavings({ home_size, setback_temp, setback_hours, heating_months, annual_bill, vacation_days, vacation_setpoint }: {
    home_size: number;
    setback_temp: number;
    setback_hours: number;
    heating_months: number;
    annual_bill: number;
    vacation_days: number;
    vacation_setpoint: number;
}) {
    const savingsPct = setback_temp * (setback_hours / 24) * (heating_months / 12) * 8;
    const dollarSavings = (savingsPct / 100) * annual_bill;
    const baselineCO2 = (home_size / 1800) * 4500;
    const co2Savings = (savingsPct / 100) * baselineCO2;
    const trees = Math.round(co2Savings / 21);
    const canadaWide = co2Savings * 14_000_000 / 1_000_000;

    // Vacation savings: normal setpoint assumed 21°C, vacation at vacation_setpoint
    const tempDiff = 21 - vacation_setpoint;
    const vacSavingsPct = tempDiff * 0.05 * (vacation_days / 365) * 100;
    const vacDollars = (vacSavingsPct / 100) * annual_bill;
    const vacCO2 = (vacSavingsPct / 100) * baselineCO2;

    return {
        pct: Math.round(savingsPct * 10) / 10,
        dollars: Math.round(dollarSavings),
        co2: Math.round(co2Savings),
        trees,
        canadaWide: Math.round(canadaWide),
        vacDollars: Math.round(vacDollars),
        vacCO2: Math.round(vacCO2),
        totalDollars: Math.round(dollarSavings + vacDollars),
        totalCO2: Math.round(co2Savings + vacCO2),
    };
}

const nightInputs: SliderInput[] = [
    { key: "home_size", icon: Home, label: "Home Size", unit: "sq ft", min: 500, max: 5000, step: 100, description: "Approximate size of your home" },
    { key: "setback_temp", icon: Thermometer, label: "Nightly Setback", unit: "°C lower", min: 1, max: 8, step: 0.5, description: "Degrees lower at night" },
    { key: "setback_hours", icon: Clock, label: "Hours per Night", unit: "hrs", min: 4, max: 12, step: 1, description: "How long the lower temp runs" },
    { key: "heating_months", icon: Thermometer, label: "Heating Season", unit: "months", min: 3, max: 10, step: 1, description: "Months per year you use heat" },
    { key: "annual_bill", icon: DollarSign, label: "Annual Heating Bill", unit: "CAD $", min: 400, max: 5000, step: 50, description: "Your estimated annual heating cost" },
];

const vacationInputs: SliderInput[] = [
    { key: "vacation_days", icon: Plane, label: "Vacation Days per Year", unit: "days", min: 0, max: 60, step: 1, description: "Total days away from home" },
    { key: "vacation_setpoint", icon: Thermometer, label: "Vacation Setpoint", unit: "°C", min: 12, max: 19, step: 0.5, description: "Target temp while away (min 12°C for pipes)" },
];

export default function EnergyCalculator() {
    const [values, setValues] = useState<EnergyCalculatorValues>(DEFAULTS);
    const [vacationOpen, setVacationOpen] = useState(false);
    const result = calcSavings(values);

    return (
        <section id="calculator" className="py-24 px-6 md:px-12 bg-[#FAFAF7]">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                    <span className="text-emerald-600 text-sm font-medium tracking-[0.2em] uppercase">Your Impact</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0A2F1F] mt-3 tracking-tight">Thermostat Savings Calculator</h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
                        Enter your home details to see exactly how much energy, money, and CO₂ you'd save by programming a nightly setback — plus an optional vacation add-on.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 space-y-7">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">🌙 Nightly Schedule</p>
                            {nightInputs.map((input) => (
                                <div key={input.key} className="">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                                <input.icon className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-[#0A2F1F]">{input.label}</p>
                                                <p className="text-xs text-gray-400">{input.description}</p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0 ml-4">
                                            <span className="text-lg font-bold text-[#0A2F1F]">{input.key === "annual_bill" ? "$" : ""}{values[input.key].toLocaleString()}</span>
                                            <span className="text-xs text-gray-400 ml-1">{input.unit}</span>
                                        </div>
                                    </div>
                                    <Slider 
                                        value={[values[input.key]]} 
                                        min={input.min} 
                                        max={input.max} 
                                        step={input.step}
                                        onValueChange={(v) => setValues({...values, [input.key]: v})}
                                    />
                                    <div className="flex justify-between text-xs text-gray-300 mt-2">
                                        <span>{input.key === "annual_bill" ? "$" : ""}{input.min}</span>
                                        <span>{input.key === "annual_bill" ? "$" : ""}{input.max}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Vacation add-on */}
                        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => setVacationOpen(!vacationOpen)}
                                className="w-full px-8 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <Plane className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-[#0A2F1F]">✈️ Vacation Mode Add-On</p>
                                        <p className="text-xs text-gray-400">Optional — add your time away from home</p>
                                    </div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${vacationOpen ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {vacationOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-gray-100"
                                    >
                                        <div className="px-8 py-6 space-y-6">
                                            <div className="bg-blue-50 rounded-2xl p-4 text-xs text-blue-700 leading-relaxed">
                                                💡 When you're away, lower your thermostat to <strong>12-15°C</strong> to protect pipes while saving maximum energy. Most smart thermostats have a built-in Vacation mode!
                                            </div>
                                            {vacationInputs.map(input => (
                                                <div key={input.key}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                                <input.icon className="w-4 h-4 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold text-[#0A2F1F]">{input.label}</p>
                                                                <p className="text-xs text-gray-400">{input.description}</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-lg font-bold text-[#0A2F1F] shrink-0 ml-4">{values[input.key]}<span className="text-xs text-gray-400 ml-1">{input.unit}</span></span>
                                                    </div>
                                                    <Slider 
                                                        value={[values[input.key]]} 
                                                        min={input.min} 
                                                        max={input.max} 
                                                        step={input.step}
                                                        onValueChange={(v) => setValues({...values, [input.key]: v})}
                                                    />
                                                    <div className="flex justify-between text-xs text-gray-300 mt-1"><span>{input.min}</span><span>{input.max}</span></div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button onClick={() => setValues(DEFAULTS)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors px-2">
                            <RefreshCw className="w-3.5 h-3.5" /> Reset to Canadian averages
                        </button>
                    </motion.div>

                    {/* Results */}
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4 sticky top-8">
                        <div className="bg-linear-to-br from-[#0A2F1F] to-[#14533B] rounded-3xl p-8 text-center">
                            <p className="text-white/50 text-sm uppercase tracking-wider mb-3">Nightly Schedule Savings</p>
                            <AnimatePresence mode="wait">
                                <motion.div key={result.pct} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <p className="text-6xl md:text-7xl font-bold text-emerald-300">{result.pct}<span className="text-3xl text-white/40 font-normal">%</span></p>
                                    <p className="text-white/50 text-sm mt-1">reduction in heating energy</p>
                                </motion.div>
                            </AnimatePresence>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="bg-white/5 rounded-2xl p-4">
                                    <p className="text-2xl font-bold text-white">${result.dollars.toLocaleString()}</p>
                                    <p className="text-white/40 text-xs mt-1">saved per year</p>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4">
                                    <p className="text-2xl font-bold text-white">{result.co2.toLocaleString()}</p>
                                    <p className="text-white/40 text-xs mt-1">kg CO₂ avoided</p>
                                </div>
                            </div>
                            {result.trees > 0 && (
                                <div className="mt-4 flex items-center justify-center gap-2 bg-emerald-500/10 rounded-2xl py-3 px-5">
                                    <Leaf className="w-4 h-4 text-emerald-400" />
                                    <p className="text-emerald-300 text-sm">Like planting <strong>{result.trees.toLocaleString()} trees</strong> every year</p>
                                </div>
                            )}
                        </div>

                        {/* Vacation results (only if enabled) */}
                        {vacationOpen && values.vacation_days > 0 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-600 rounded-3xl p-6 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                    <Plane className="w-4 h-4 text-blue-200" />
                                    <p className="text-blue-200 text-sm font-medium">+ Vacation Mode ({values.vacation_days} days at {values.vacation_setpoint}°C)</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/10 rounded-2xl p-3 text-center">
                                        <p className="text-xl font-bold">${result.vacDollars}</p>
                                        <p className="text-blue-200 text-xs mt-0.5">extra saved</p>
                                    </div>
                                    <div className="bg-white/10 rounded-2xl p-3 text-center">
                                        <p className="text-xl font-bold">{result.vacCO2} kg</p>
                                        <p className="text-blue-200 text-xs mt-0.5">CO₂ avoided</p>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/20 flex justify-between text-sm">
                                    <span className="text-blue-200">Combined total savings:</span>
                                    <span className="font-bold">${result.totalDollars}/yr</span>
                                </div>
                            </motion.div>
                        )}

                        <div className="bg-white rounded-3xl p-6 border border-gray-100">
                            <p className="text-sm font-semibold text-[#0A2F1F] mb-1">🇨🇦 Canada-Wide Potential</p>
                            <p className="text-gray-400 text-xs mb-3">If every eligible Canadian home used the same nightly settings:</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-bold text-[#0A2F1F]">{result.canadaWide.toLocaleString()}</p>
                                <p className="text-gray-400 text-sm mb-1">megatonnes CO₂/yr avoided</p>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Based on 14 million programmable-thermostat homes in Canada.</p>
                        </div>

                        <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100">
                            <p className="text-xs text-emerald-700 leading-relaxed">
                                <strong>Methodology:</strong> Based on Natural Resources Canada heating data. Assumes natural gas as primary heat source. Savings vary by insulation, climate zone, and model.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}