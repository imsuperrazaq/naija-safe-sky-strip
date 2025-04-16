
import { ATCDashboard } from "../components/atc/ATCDashboard";
import { sampleFlights } from "../data/sampleFlights";

const Index = () => {
  return (
    <ATCDashboard 
      initialFlights={sampleFlights}
      controller="Adebola Oyedele"
      sector="Lagos ACC"
    />
  );
};

export default Index;
