"use client";
import { Button } from "@repo/ui/button";
import Card from "@repo/ui/card";
import Input from "@repo/ui/input";
import React, { useRef, useState } from "react";
import p2pTransaction from "../lib/account/p2ptransaction";

const SendMoneyComponent = () => {
  const payer = useRef<HTMLInputElement>(null);
  const amount = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState("");
  return (
    <div className="w-[25-rem]">
      <Card label="Send Money">
        <Input label="Number" Ref={payer} placeholder="Enter mobile number" />
        <Input label="Amount" Ref={amount} placeholder="Enter Amount" />
        <Button
          onClick={async () => {
            //* INFO -> ensure that this is written inside cause it is not possible to rerender after each onClick function to prevent "" -> this re renders
            const amountValue = amount.current?.value || "";
            const payerNumber = payer.current?.value || "";
            const data = await p2pTransaction(amountValue, payerNumber);
            setResponse(data.message);
          }}
        >
          Send
        </Button>
        <p className="mt-2 text-green-600">{response}</p>
      </Card>
    </div>
  );
};

export default SendMoneyComponent;
