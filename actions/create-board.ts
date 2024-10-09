"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

//type for error state
export type State = {
    errors?: {
        title?: string[];
    },
    message?: string | "";
}

//zod validations
const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Minimum length of 3 letters is required"
    })
});

//server action function for post request to create a Board
export async function create(prevState: State, formData: FormData) {

    //validated via zod
    const validatedFields = CreateBoard.safeParse({
        title: formData.get("title")
    });

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields."     
        }
    }

    const {title} = validatedFields.data;

    try {
        //post to server
        await db.board.create({
            data: {
                title
            }
        }); 
    } catch (error) {
        return {
            message: "Database Error",
        }
    }


    //display change into page
    revalidatePath("/organization/org_2mHRcet53Bsrmyv0o85kcyioBBb");
    redirect("/organization/org_2mHRcet53Bsrmyv0o85kcyioBBb");
}