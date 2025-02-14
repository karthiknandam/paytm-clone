import express from "express";
import db from "@repo/db/client";
import prisma from "@repo/db/client";
const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  const { token }: { token: string } = req.body;

  try {
    const data = await prisma.onRampTransaction.findUnique({
      where: {
        token,
      },
      select: {
        userId: true,
        amount: true,
        status: true,
      },
    });
    if (!data) {
      return res.status(403).json({
        message: "Unable to fund the wallet",
      });
    }
    if (data.status === "Success" || data.status === "Failure") {
      return res.json({
        message: "Cannot be funded",
      });
    }
    const { userId, amount } = data;

    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(userId),
        },
        data: {
          amount: {
            // You can also get this from your DB
            increment: Number(amount),
          },
        },
      }),

      //   db.balance.upsert({
      //     where: { userId },
      //     update: { amount: { increment: amount } },
      //     create: { userId, amount, locked: 0 }, // Default locked to 0 if new entry
      //   }),
      db.onRampTransaction.update({
        where: {
          token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
