import React, { ReactNode } from "react";

const Card = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className="p-5 bg-white rounded-lg">
      <h3 className="mb-2 text-lg pb-2 border-b border-gray-300">{label}</h3>
      {children}
    </div>
  );
};

export default Card;
