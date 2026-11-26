import React from "react";

const PageLabel = ({ label }) => {
  return (
    <div className="mb-10 flex items-center gap-4" dir="rtl">
      <span className="h-7 w-1 rounded-full bg-purple-600" />

      <div>
        <h1 className="text-lg font-bold text-white">{label}</h1>
      </div>
    </div>
  );
};

export default PageLabel;
