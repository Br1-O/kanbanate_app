import { z } from "zod";

//zod schema /w validations
export const DeleteList = z.object({
    id: z.string(),
    boardId: z.string()
});