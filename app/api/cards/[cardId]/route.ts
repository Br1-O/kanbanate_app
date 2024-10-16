import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//route for card request to be used on client components
export async function GET(
    req:Request,
    { params } : { params: { cardId: string }}
) {
    try {
        const { userId, orgId } = auth();

        //check if used is logged and organization is selected
        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //fetch the card data from db /w orgId check so it is only accessed by members of the organization
        const card = await db.card.findUnique({
            where: {
                id: params.cardId,
                list: {
                    board: {
                        orgId: orgId
                    }
                }
            },
            include: {
                list: {
                    select: {
                        title: true
                    }
                }
            }
        });

        //return response of json with the card info
        return NextResponse.json(card);
        
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}