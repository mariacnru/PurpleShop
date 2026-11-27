import { useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';

const AccordionItem = ({ label, content }) => {
  const [IsOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <div
        onClick={toggleIsOpen}
        className={`flex-between select-none h-12 text-sm px-4 flex-ic duration-300 active:*:scale-95 min-h-20 group cursor-pointer ${IsOpen ? 'bg-purple-600/10 text-purple-500' : ''}`}
        tabIndex="1"
      >
        <div className="duration-300 cursor-pointer w-full">{label}</div>
        <BiChevronLeft
          className={`text-xl text-zinc-400 transition-transform duration-300 ${IsOpen ? '-rotate-90' : ''}`}
        />
      </div>
      <div
        className={`duration-300 transition-all text-sm ${IsOpen ? 'h-full p-5' : 'h-0 opacity-0 invisible p-0 overflow-hidden whitespace-nowrap'}`}
      >
        {content}
      </div>
    </div>
  );
};

export default AccordionItem;
