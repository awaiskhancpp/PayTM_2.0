"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    const user=await prisma.user.findFirst({
        where:{
            id:Number(session?.user?.id)
        }
    })
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        to: user?.name,
    }))
}