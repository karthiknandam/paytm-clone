"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function p2pTransaction(
  amount: string,
  toAccount: string
) {
  const session = await getServerSession(authOptions);
  const from = session.user.id;
  if (!from) {
    throw new Error("Unothorized user");
  }
  const fromUser = await prisma.user.findFirst({
    where: {
      id: Number(from),
    },
  });
  if (!fromUser) {
    throw new Error("Please Signup / Credential not found");
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: toAccount,
    },
  });
  if (!toUser) {
    throw new Error(
      "Unable to find the sender account please enter valid mobile number"
    );
  }
  try {
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" where "userId" = ${Number(from)} For UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: {
          userId: Number(from),
        },
      });
      if (
        !fromBalance ||
        fromBalance.amount < Number(amount) * 100 ||
        fromBalance.amount - Number(amount) * 100 < 0
      ) {
        throw new Error("Unable to transfer the fund / Low funds");
      }
      await tx.balance.update({
        where: {
          userId: Number(from),
        },
        data: {
          amount: {
            decrement: Number(amount) * 100,
          },
        },
      });
      await tx.balance.update({
        where: {
          userId: Number(toUser.id),
        },
        data: {
          amount: {
            increment: Number(amount) * 100,
          },
        },
      });
      await tx.p2PTransaction.create({
        data: {
          fromUserId: Number(from),
          toUserId: Number(toUser.id),
          amount: Number(amount) * 100,
          startTime: new Date(),
        },
      });
    });
    return {
      message: "Succesfully sent ✅",
    };
  } catch (error) {
    return {
      message: "Unable process data / Server Error" + error,
    };
  }
}
