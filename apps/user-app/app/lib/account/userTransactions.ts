"use server";

import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function userTransactions() {
  const session = await getServerSession(authOptions);
  const from = session.user.id;
  if (!session || !from) {
    throw new Error("Unauthorized");
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(from),
      },
      select: {
        sentTransactions: {
          select: {
            id: true,
            amount: true,
            startTime: true,
            fromUserId: true,
            toUser: {
              select: {
                number: true,
              },
            },
            fromUser: {
              select: {
                number: true,
              },
            },
          },
        },
        receivedTransactions: {
          select: {
            id: true,
            amount: true,
            startTime: true,
            fromUserId: true,
            toUser: {
              select: {
                number: true,
              },
            },
            fromUser: {
              select: {
                number: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error("Unathorized user");
    }
    return {
      sent: user.sentTransactions,
      recived: user.receivedTransactions,
    };
  } catch (error) {
    return {
      message: error,
    };
  }
}
