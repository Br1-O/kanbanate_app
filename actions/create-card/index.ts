"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        };
    }

    const { title, boardId, listId } = data;
    let card;

    try {
        //fetch the list where the card will be appended
        const list = await db.list.findUnique({
            where: {
                id: listId,
                board: {
                    orgId: orgId
                }
            }
        });

        //check if any list matches
        if (!list) {
            return {
                error: "List not found"
            }
        }

        //fetch the order of the last card inside the current list
        const lastCard = await db.card.findFirst({
            where: {
                listId: listId
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            }
        });

        //create the new card order
        const newOrder = lastCard ? lastCard.order + 1 : 1;

        //create new card in db
        card = await db.card.create({
            data: {
                title: title,
                listId: listId,
                order: newOrder
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
            error: "Failed to create."
        }
    }
    
    //changhe path once operation finishes
    revalidatePath(`/board/${boardId}`);

    return { data: card }
}

export const createCard = createSafeAction(CreateCard, handler);