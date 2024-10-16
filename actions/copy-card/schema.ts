import { z } from "zod";

//zod schema /w validations
export const CopyCard = z.object({
    id: z.string(),
    boardId: z.string()
});