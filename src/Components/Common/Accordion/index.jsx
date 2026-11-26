import React from "react";
import AccordionItem from "./Item";

const Accordion = ({ options }) => {
  return (
    <div className="border rounded-lg  divide-y divide-purple-800/50 border-purple-800/50 overflow-hidden w-full mx-auto">
      {options.map((option) => {
        return <AccordionItem {...option} key={option.id} />;
      })}
    </div>
  );
};

export default Accordion;
