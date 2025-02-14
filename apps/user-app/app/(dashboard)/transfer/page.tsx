import React from "react";
import AmountComponent from "../../components/AmountComponent";
import BalancesComponent from "../../components/BalancesComponent";
import RecentTransactions from "../../components/RecentTransactions";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

const page = async () => {
  const transactions = await getOnRampTransactions();
  const balance = await getBalance();
  return (
    <div className="w-full mt-5">
      <div className="font-bold text-4xl text-[#6a51a6] mt-5 mb-10">
        Transfer
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div>
          <AmountComponent />
        </div>
        <div>
          <BalancesComponent amount={balance.amount} locked={balance.locked} />
          <div className="mt-4 max-h-[10rem] overflow-scroll rounded-md">
            <RecentTransactions transaction={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
