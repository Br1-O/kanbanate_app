import { z } from "zod";

//zod schema /w validations
export const DeleteCard = z.object({
    id: z.string(),
    boardId: z.string()
});