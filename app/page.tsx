import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import StatsSection from "@/components/StatsSection";
import ThermostatList from "@/components/ThermostatList";
import EnergyCalculator from "@/components/EnergyCalculator";
import VacationSection from "@/components/VacationSection";
import SleepTempSection from "@/components/SleepTempSection";
import CommunityPledge from "@/components/CommunityPledge";

export default function Home() {
    return (
        <div className="bg-bg">
            <HeroSection />
            <ProblemSection />
            <StatsSection />
            <ThermostatList />
            <EnergyCalculator />
            {/* <VacationSection />
            <SleepTempSection /> */}
            <CommunityPledge />
        </div>
    );
}