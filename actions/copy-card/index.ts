"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        };
    }

    const { id, boardId } = data;
    let card;

    try {
        //fetch the card to copy from db by id
        const cardToCopy = await db.card.findUnique({
            where: {
                id: id,
                list: {
                    board: {
                        orgId: orgId
                    }
                }
            }
        });

        //check if any card matches
        if (!cardToCopy) {
            return { error: "Card not found" }
        }

        //get order of last card to assign proper order to the copy card
        const lastCard = await db.card.findFirst({
            where: {
                listId: cardToCopy.listId
            },
            orderBy: { order: "desc" },
            select: { order: true }
        });

        //create new order for copy card
        const newOrder = lastCard ? lastCard.order + 1 : 1;

        //create the card copy into the db
        card = await db.card.create({
            data: {
                title: `${cardToCopy.title} - Copy`,
                description: cardToCopy.description,
                order: newOrder,
                listId: cardToCopy.listId
            }
        });

        //create audit log for user activity
        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE
        });

    } catch (error) {
        return {
            error: "Failed to copy."
        }
    }
    
    //update path once operation finishes
    revalidatePath(`/organization/${boardId}`);
    return { data: card }
}

export const copyCard = createSafeAction(CopyCard, handler);