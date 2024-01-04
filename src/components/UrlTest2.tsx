import React from "react";

const DisplayURLContent: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Content from URL: {url}</h1>
      <div className="bg-gray-100 p-4 rounded-md">
        <iframe
          title="URL Content"
          src={url}
          className="w-full h-full border-none"
          style={{ minHeight: "500px" }} // Adjust the height as needed
        ></iframe>
      </div>
    </div>
  );
};

export default DisplayURLContent;
