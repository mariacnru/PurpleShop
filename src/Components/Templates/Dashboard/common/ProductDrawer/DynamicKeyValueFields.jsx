import React from 'react';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';

const DynamicKeyValueFields = ({
  title,
  items,
  onAdd,
  onRemove,
  onChange,
  keyPlaceholder = 'کلید (مثلا ram)',
  valuePlaceholder = 'مقدار (مثلا 8GB)',
}) => {
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center">
        <label>{title}</label>

        <button
          type="button"
          className="text-purple-500 text-sm flex items-center gap-2"
          onClick={onAdd}
        >
          <RiAddLine />
          افزودن
        </button>
      </div>

      <div className="mt-2 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center gap-2">
            <input
              type="text"
              placeholder={keyPlaceholder}
              value={item.key}
              onChange={(e) => onChange(index, 'key', e.target.value)}
              className="border border-zinc-800 p-2 rounded-sm w-44"
            />

            <input
              type="text"
              placeholder={valuePlaceholder}
              value={item.value}
              onChange={(e) => onChange(index, 'value', e.target.value)}
              className="border border-zinc-800 p-2 rounded-sm w-44"
            />

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-red-500 cursor-pointer"
              >
                <RiCloseLine />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicKeyValueFields;
