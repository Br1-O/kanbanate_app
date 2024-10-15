"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        };
    }

    const { id } = data;
    let board;

    try {
        //orgId match is used as an extra auth
        board = await db.board.delete({
            where: {
                id: id,
                orgId: orgId
            }
        });
    } catch (error) {
        return {
            error: "Failed to delete."
        }
    }
    
    //redirect once operation finishes
    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);
}

export const deleteBoard = createSafeAction(DeleteBoard, handler);