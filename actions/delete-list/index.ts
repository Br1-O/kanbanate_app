"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";
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
    let list;

    try {
        //orgId match is used as an extra auth
        list = await db.list.delete({
            where: {
                id: id,
                boardId: boardId,
                board: {
                    orgId: orgId
                }
            }
        });
                                
        //create audit log for user activity
        await createAuditLog({
            entityId: list.id,
            entityTitle: list.title,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.DELETE
        });
        
    } catch (error) {
        return {
            error: "Failed to delete."
        }
    }
    
    //update path once operation finishes
    revalidatePath(`/organization/${boardId}`);
    return { data: list }
}

export const deleteList = createSafeAction(DeleteList, handler);