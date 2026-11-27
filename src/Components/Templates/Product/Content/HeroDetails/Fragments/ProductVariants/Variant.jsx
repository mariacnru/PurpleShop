import React from "react";

const Variant = ({item}) => {
  return (
    <div className="bg-zinc-100/60 p-2 h-18 flex flex-col justify-between rounded-md w-full">
      <p className="text-xs text-zinc-500">{item}</p>
      <p className="text-xs font-medium text-zinc-700 line-clamp-2">
        Mediatek MT6769 Helio G85 (12 nm)
      </p>
    </div>
  );
};

export default Variant;
