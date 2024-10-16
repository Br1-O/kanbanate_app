import { ACTION, AuditLog } from "@prisma/client";

//function to generate log messages based on the entity and action type
export const generateLogMessage = (log: AuditLog) => {

    const { action, entityTitle, entityType} = log;

    switch (action) {
        case ACTION.CREATE:
            return `created ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.UPDATE:
            return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.DELETE:
            return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
        default:
            return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
    }
}