import React from "react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import AsyncSelect from "react-select/async";
import searchSellers from "../../../../../services/seller.service";

const SellerFields = ({ sellers, onAdd, onRemove, onChange }) => {
  const loadSellersOption = async (inputValue) => {
    const sellers = await searchSellers(inputValue);

    return sellers.map((seller) => ({ value: seller._id, label: seller.name }));
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <label>افزودن فروشنده</label>

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
        {sellers.map((seller, index) => (
          <div key={index} className="flex justify-between items-center gap-2">
            <div className="w-full text-sm bg-zinc-800">
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadSellersOption}
                value={seller.info}
                onChange={(option) => {
                  onChange(index, "info", option);
                  onChange(index, "id", option?.value);
                }}
                noOptionsMessage={() => "فروشنده ای یافت نشد"}
                placeholder="جسجوی فروشنده"
                loadingMessage={() => "درحال جستجو"}
              />
            </div>

            <input
              type="text"
              placeholder="قیمت"
              value={seller.price}
              onChange={(e) => onChange(index, "price", e.target.value)}
              className="border border-zinc-800 p-2 rounded-sm w-full"
            />

            <input
              type="text"
              placeholder="موجودی"
              value={seller.stock}
              onChange={(e) => onChange(index, "stock", e.target.value)}
              className="border border-zinc-800 p-2 rounded-sm w-full"
            />

            {sellers.length > 1 && (
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

export default SellerFields;
