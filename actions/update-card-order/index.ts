"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        };
    }

    const { items, boardId } = data;
    let updatedCards;

    try {
        //update all the cards order and list in the db
        const transaction = items.map((card) => 
            db.card.update({
                where: {
                    id: card.id,
                    list: {
                        board: {
                            orgId: orgId
                        }
                    }
                },
                data: {
                    order: card.order,
                    listId: card.listId
                }
            })
        );

        //executes the transaction, which will update the order and list of all the cards in the db
        updatedCards = await db.$transaction(transaction);
    } catch (error) {
        return {
            error: "Failed to reorder the cards."
        }
    }
    
    //changhe path once operation finishes
    revalidatePath(`/board/${boardId}`);

    return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);