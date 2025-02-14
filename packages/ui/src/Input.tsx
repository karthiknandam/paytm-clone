import React, { Ref } from "react";

const Input = ({
  label,
  Ref,
  placeholder,
}: {
  label: string;
  Ref: Ref<HTMLInputElement>;
  placeholder: string;
}) => {
  return (
    <div className="mb-2 flex flex-col">
      <label className="mb-2">{label}</label>
      <input
        type="text"
        ref={Ref}
        className="p-2 border border-gray-300 rounded-md text-sm"
        placeholder="Enter Amount"
      />
    </div>
  );
};

export default Input;
