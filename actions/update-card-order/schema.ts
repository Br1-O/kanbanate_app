import { z } from "zod";

//zod schema /w validations
export const UpdateCardOrder = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            order: z.number(),
            listId: z.string(),
            createdAt: z.date(),
            updatedAt: z.date()
        })
    ),
    boardId: z.string()
});