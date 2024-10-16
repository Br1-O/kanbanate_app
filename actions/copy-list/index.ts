"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";
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
        //fetch the list to copy from db
        const listToCopy = await db.list.findUnique({
            where: {
                id: id,
                boardId: boardId,
                board: {
                    orgId: orgId
                }
            },
            include: {
                cards: true
            }
        });

        //check if there is a matching list
        if (!listToCopy) {
            return {error: "List not found"}
        }

        //get the order of the last list to create order for the new list
        const lastList = await db.list.findFirst({
            where: { boardId },
            orderBy: { order: "desc" },
            select: { order: true }
        });

        const newOrder = lastList ? lastList.order + 1 : 1;

        //create a new list with all the proper cards
        list = await db.list.create({
            data: {
                boardId: listToCopy.boardId,
                title: `${listToCopy.title} - Copy`,
                order: newOrder,
                cards: {
                    createMany: {
                        data: listToCopy.cards.map((card) => ({
                            title: card.title,
                            description: card.description,
                            order: card.order
                        }))
                    }
                }
            },
            include: {
                cards: true
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
            error: "Failed to copy."
        }
    }
    
    //update path once operation finishes
    revalidatePath(`/organization/${boardId}`);
    return { data: list }
}

export const copyList = createSafeAction(CopyList, handler);