import Card from "@repo/ui/card";
import React from "react";
import userTransactions from "../lib/account/userTransactions";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";

const TransactionComponenet = async () => {
  const userData = await userTransactions();
  const { sent, recived } = userData;
  if (!sent) {
    return <div>No Transactions</div>;
  }
  return (
    <div className="max-h-[25rem] overflow-scroll rounded-md">
      <Card label="Transactions">
        <TransferComp transfer={sent} type={"sent"} />
        <TransferComp transfer={recived} type={"recieve"} />
      </Card>
    </div>
  );
};

const TransferComp = ({
  transfer,
  type,
}: {
  transfer: {
    id: any;
    amount: any;
    startTime: any;
    fromUserId: any;
    toUser: {
      number: any;
    };
    fromUser: {
      number: any;
    };
  }[];
  type: "sent" | "recieve";
}) => {
  return (
    <div className="">
      {transfer.map((data: any) => (
        <div className=" border-b border-gray-400 flex justify-between p-2">
          <div className="flex">
            {type === "sent" ? (
              <GoArrowUpRight
                className={`text-red-600 w-5 h-5 stroke-red-600`}
              />
            ) : (
              <GoArrowDownLeft
                className={`text-green-600 w-5 h-5 stroke-green-600`}
              />
            )}

            <div className="ml-1">
              <h4
                className={`text-${type === "sent" ? "red" : "green"}-600 font-bold`}
              >
                {type}
              </h4>
              <p className="text-xs flex text-gray-400">
                <span className="font-bold mr-2 text-gray-650">To : </span>
                {type === "sent" ? data.toUser.number : data.fromUser.number}
              </p>
            </div>
          </div>
          <div>
            <div className="text-base font-semibold">
              {" "}
              Rs. {data.amount / 100}
            </div>
            <p className="text-xs text-gray-400">
              {data.startTime.toISOString().split("T")[0]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionComponenet;
