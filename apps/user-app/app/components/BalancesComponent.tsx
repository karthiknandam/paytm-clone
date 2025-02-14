import Card from "@repo/ui/card";
import React from "react";

const BalancesComponent = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card label="Balances">
      <div>
        <Balance amount={amount} name="Unlocked balance" />
        <Balance amount={locked} name="Total Locked balance" />
        <Balance amount={amount + locked} name="Total balance" />
      </div>
    </Card>
  );
};
const Balance = ({ amount, name }: { amount: number; name: string }) => {
  return (
    <>
      <div className={"flex justify-between border-b border-slate-300 py-2"}>
        <div>{name}</div>
        <div>{amount / 100} INR</div>
      </div>
    </>
  );
};

export default BalancesComponent;
