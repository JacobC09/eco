import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import StatsSection from "@/components/StatsSection";
import ThermostatList from "@/components/ThermostatList";
import EnergyCalculator from "@/components/EnergyCalculator";
// import VacationSection from "@/components/VacationSection";
// import SleepTempSection from "@/components/SleepTempSection";
// import VideoTutorials from "@/components/VideoTutorials";
// import CommunityPledge from "@/components/CommunityPledge";
// import SDGSection from "@/components/SDGSection";
// import FAQSection from "@/components/FAQSection";
// import CallToAction from "@/components/CallToAction";

export default function Home() {
    return (
        <div className="bg-[#FAFAF7]">
            <HeroSection />
            <ProblemSection />
            <StatsSection />
            <ThermostatList />
            <EnergyCalculator />
            {/* <VacationSection />
            <SleepTempSection />
            <VideoTutorials />
            <CommunityPledge />
            <SDGSection />
            <FAQSection />
            <CallToAction /> */}
        </div>
    );
}