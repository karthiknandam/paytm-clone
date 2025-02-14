"use client";
import Input from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import Card from "@repo/ui/card";
import SelectBank from "@repo/ui/select";
import React, { ChangeEvent, Ref, useRef, useState } from "react";
import onRampTransaction from "../lib/account/onRampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];
const AmountComponent = () => {
  const Ref = useRef<HTMLInputElement>(null);
  const [refElement, selectRefElement] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState<string>(
    SUPPORTED_BANKS[0]?.name || ""
  );
  return (
    <Card label="Add Money">
      <Input label="Amount" Ref={Ref} placeholder="Enter amount" />
      <div className="mt-3">
        <div className="mb-2">Select</div>
        <SelectBank
          onSelect={(value: string) => {
            selectRefElement(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl
            );
          }}
          options={SUPPORTED_BANKS.map((x) => {
            return {
              key: x.name,
              name: x.name,
            };
          })}
        />
      </div>
      <Button
        onClick={async () => {
          await onRampTransaction(Number(Ref.current?.value), provider);
          window.location.href = refElement || "";
        }}
      >
        Transfer
      </Button>
    </Card>
  );
};

export default AmountComponent;
