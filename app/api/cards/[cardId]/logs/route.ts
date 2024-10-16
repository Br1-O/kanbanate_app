import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
    request:Request,
    { params }: {params: {cardId: string}}
) {
    try {
        const {userId, orgId} = auth();

        //check if user or organization is not logged/selected
        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        //fetch all the audit logs related to the card
        const auditLogs = await db.auditLog.findMany({
            where: {
                orgId: orgId,
                entityId: params.cardId,
                entityType: ENTITY_TYPE.CARD
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 3
        });

        return NextResponse.json(auditLogs);
        
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500});
    }
}