import Navigation from "@/components/common/navbar";
import FHSACalculator from "@/components/screens/calculators/fhsa/fhsa-calculator";
import React from "react";

const page = () => {
  return (
    <>
      <Navigation />
      <FHSACalculator />
    </>
  );
};

export default page;
