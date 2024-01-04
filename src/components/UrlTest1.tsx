import React from "react";
import DisplayURLContent from "./UrlTest2"; // Adjust the import path

const YourOtherPage: React.FC = () => {
  const exampleURL = "http://localhost:5173/game"; // Replace this with your desired URL

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Displaying Content from URL</h1>
      <DisplayURLContent url={exampleURL} />
    </div>
  );
};

export default YourOtherPage;
