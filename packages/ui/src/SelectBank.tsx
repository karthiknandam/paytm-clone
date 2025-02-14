import React from "react";

const SelectBank = ({
  onSelect,
  options,
}: {
  onSelect: any;
  options: {
    key: string;
    name: string;
  }[];
}) => {
  return (
    <div className="w-full mb-4">
      <select
        className="w-full p-2 text-sm border border-gray-300 rounded-md text-gray-400"
        onChange={(e) => {
          onSelect(e.target.value);
        }}
      >
        {options.map((option) => (
          <option value={option.key}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectBank;
