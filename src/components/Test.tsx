import React, { useState } from "react";

interface ProbabilityItem {
  label: string;
  percentage: number;
}

const initialProbability: ProbabilityItem[] = [
  { label: "item 1", percentage: 100 },
  { label: "item 2", percentage: 100 },
  { label: "item 3", percentage: 100 },
  { label: "item 4", percentage: 100 },
  // Add more items here if needed
];

const ProbabilityList: React.FC = () => {
  const [probability, setProbability] =
    useState<ProbabilityItem[]>(initialProbability);

  const handlePercentageChange = (index: number, value: number) => {
    const updatedProbability = [...probability];
    updatedProbability[index].percentage = value;
    setProbability(updatedProbability);
  };

  const handleInputBlur = () => {
    // Ensure at least one input is not zero
    const allZero = probability.every((item) => item.percentage === 0);
    if (allZero) {
      // Find the first input and set it to 1 if all inputs are zero
      const updatedProbability = [...probability];
      updatedProbability[0].percentage = 1;
      setProbability(updatedProbability);

    }
  };

  return (
    <div>
      {probability.map((item, index) => (
        <div key={index}>
          <label>{item.label}</label>
          <input
            type="number"
            value={item.percentage}
            onChange={(e) =>
              handlePercentageChange(index, parseInt(e.target.value))
            }
            onBlur={handleInputBlur}
            min={0}
            max={100}
          />
        </div>
      ))}
    </div>
  );
};

export default ProbabilityList;
