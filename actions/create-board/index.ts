"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

//handler to create board that will check userId and redirect on success
const handler = async (data:InputType): Promise<ReturnType> => {
    const { userId } = auth();

    if (!userId) {
        return {
            error: "Unauthorized"
        }
    }

    const { title } = data;

    let board;

    try {
        board = await db.board.create({
            data: {
                title
            }
        });
    } catch (error) {
        return {
            error: "Failed to create board."
        }
    }

    //redirect to proper board url
    revalidatePath(`/board/${board.id}`);

    return {data: board}
}

export const createBoard = createSafeAction(CreateBoard, handler);