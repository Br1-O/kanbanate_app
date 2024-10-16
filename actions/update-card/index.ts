"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        };
    }

    const { id, boardId, ...values } = data;
    let card;

    try {
        //orgId match is used as an extra auth
        card = await db.card.update({
            where: {
                id: id,
                list: {
                    board: {
                        orgId: orgId
                    }
                }
            },
            data: {
                ...values
            }
        });
                                        
        //create audit log for user activity
        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.UPDATE
        });
        
    } catch (error) {
        return {
            error: "Failed to update."
        }
    }
    
    //changhe path once operation finishes
    revalidatePath(`/board/${boardId}`);

    return { data: card }
}

export const updateCard = createSafeAction(UpdateCard, handler);