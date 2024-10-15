import { z } from "zod";

//zod schema /w validations
export const DeleteBoard = z.object({
    id: z.string()
});