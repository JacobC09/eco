import { Thermometer } from "lucide-react";

const sectionLinks = [
    { label: "The Problem", href: "#problem" },
    { label: "Statistics", href: "#stats" },
    { label: "Thermostats", href: "#thermostats" },
    { label: "Calculator", href: "#calculator" },
    { label: "Community", href: "#community" },
];

export default function Footer() {
    return (
        <footer className="text-white py-10 px-6 md:px-12 bg-dark mt-[10vh]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-emerald-400">
                            <Thermometer className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-base">ThermoSmart</p>
                            <p className="text-white/40 text-xs">A Canadian Eco-Club School Project</p>
                        </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
                        {sectionLinks.map(link => (
                            <a key={link.href} href={link.href} className="text-white/40 hover:text-white text-sm transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}