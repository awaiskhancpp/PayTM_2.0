"use Server"
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const session = await getServerSession(authOptions);
    console.log("HELFLCSKLNSKN")
    console.log(process.env.DATABASE_URL)
    if (session.user) {
        
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
};
