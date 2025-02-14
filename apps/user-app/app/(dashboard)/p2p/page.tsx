import React from "react";
import SendMoneyComponent from "../../components/SendMoneyComponent";
import Card from "@repo/ui/card";
import TransactionComponenet from "../../components/TransactionComponenet";

const page = () => {
  return (
    <div className="grid grid-cols-2 w-full p-4 gap-4">
      <SendMoneyComponent />
      <TransactionComponenet />
    </div>
  );
};

export default page;
