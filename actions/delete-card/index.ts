"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";
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

        //delete card in db
        card = await db.card.delete({
            where: {
                id:id,
                list: {
                    board: {
                        orgId: orgId
                    }
                }
            }
        });
                        
        //create audit log for user activity
        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.DELETE
        });

    } catch (error) {
        return {
            error: "Failed to delete."
        }
    }
    
    //update path once operation finishes
    revalidatePath(`/organization/${boardId}`);
    return { data: card }
}

export const deleteCard = createSafeAction(DeleteCard, handler);