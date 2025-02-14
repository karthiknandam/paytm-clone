import Card from "@repo/ui/card";
import React from "react";
const RecentTransactions = ({
  transaction,
}: {
  transaction: {
    time: Date;
    amount: number;
    status: any;
    provider: string;
  }[];
}) => {
  if (!transaction.length) {
    return (
      <Card label="Recent Transactions">
        <div className="flex justify-center items-center p-10">
          No Recent Transactions
        </div>
      </Card>
    );
  }
  // Success
  // Failure
  // Processing
  return (
    <Card label="Recent Trasactions">
      <div className="pt-2">
        {transaction.map((t) => (
          <div className="flex justify-between mb-2">
            <div>
              <div
                className={`text-sm ${t.status === "Processing" ? "text-orange-400" : t.status === "Failure" ? "text-red-600" : "text-green-600"}`}
              >
                {t.status}
              </div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {Number(t.amount) / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
