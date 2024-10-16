"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        };
    }

    const { title, boardId } = data;
    let list;

    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId: orgId
            }
        });

        //auth/validation for existence of board
        if (!board) {
            return {
                error: "Board not found"
            }
        }

        //check which is the last list inside the board to assign order
        const lastList = await db.list.findFirst({
            where: { boardId: boardId },
            orderBy: { order: "desc" },
            select: { order: true}
        });

        //create new order value for the new list
        const newOrder = lastList ? lastList.order + 1 : 1;

        //orgId match is used as an extra auth in the creation of the list
        list = await db.list.create({
            data: {
                title: title,
                boardId: boardId,
                order: newOrder
            }
        });
        
        //create audit log for user activity
        await createAuditLog({
            entityId: list.id,
            entityTitle: list.title,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE
        });
        
    } catch (error) {
        return {
            error: "Failed to create the list."
        }
    }
    
    //changhe path once operation finishes
    revalidatePath(`/board/${boardId}`);

    return { data: list }
}

export const createList = createSafeAction(CreateList, handler);