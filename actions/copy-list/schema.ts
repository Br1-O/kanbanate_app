import { z } from "zod";

//zod schema /w validations
export const CopyList = z.object({
    id: z.string(),
    boardId: z.string()
});