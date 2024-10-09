"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

//server action function for delete request
export async function deleteBoard(id: string) {

    //delete to server
    await db.board.delete({
        where: {
            id
        }
    });

    //display change into page
    revalidatePath("/organization/org_2mHRcet53Bsrmyv0o85kcyioBBb");
}