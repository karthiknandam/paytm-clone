"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async (amount: number, provider: string) => {
  const session = await getServerSession(authOptions);
  if (!session.user && session.user.id) {
    return {
      message: "Unauthorized user",
    };
  }
  const token = Math.random().toString();
  await prisma.onRampTransaction.create({
    data: {
      amount: amount * 100,
      provider,
      token,
      startTime: new Date(),
      userId: Number(session.user.id),
      status: "Processing",
    },
  });
  return {
    message: "On ramp transaction is applied successfull",
  };
};
