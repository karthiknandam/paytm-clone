"use client";

import { useBalance } from "@repo/store/balance";
export default function () {
  const balance = useBalance();
  return <div>hi there from merge-test-v1 {balance}</div>;
}
