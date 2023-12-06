import React from "react";

interface Item {
  label: string;
  percentage: number;
}

interface BiasedOutputState {
  items: Item[];
  result: string | null;
}

class BiasedOutput extends React.Component<{}, BiasedOutputState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [
        { label: "A", percentage: 30 },
        { label: "B", percentage: 20 },
        { label: "C", percentage: 50 },
        // Add more items as needed...
      ],
      result: null,
    };
  }

  getRandomItem = (): Item => {
    const { items } = this.state;
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
    return items[0]; // Default return, in case of issues
  };

  generateBiasedOutput = (): void => {
    const result = this.getRandomItem();
    this.setState({ result: result.label });
  };

  render() {
    const { result } = this.state;
    return (
      <div>
        <button onClick={this.generateBiasedOutput}>
          Generate Biased Output
        </button>
        {result && <p>Biased Output: {result}</p>}
      </div>
    );
  }
}

export default BiasedOutput;
