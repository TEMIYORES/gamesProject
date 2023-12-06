import React, { useState } from "react";

interface Item {
  label: string;
  percentage: number;
}

const BiasedOutput: React.FC<{ items: Item[] }> = ({ items }) => {
  const [result, setResult] = useState<string | null>(null);

  const getRandomItem = (items: Item[]): Item | undefined => {
    let total = 0;
    items.forEach((item) => {
      total += item.percentage;
    });
    let random = Math.floor(Math.random() * total);
    for (const item of items) {
      if (random < item.percentage) {
        return item;
      }
      random -= item.percentage;
    }
  };

  const generateBiasedOutput = () => {
    const selected = getRandomItem(items);
    if (selected) {
      setResult(selected.label);
    }
  };

  return (
    <div>
      <button onClick={generateBiasedOutput}>Generate Biased Output</button>
      {result && <p>Biased Output: {result}</p>}
    </div>
  );
};

export default BiasedOutput;
