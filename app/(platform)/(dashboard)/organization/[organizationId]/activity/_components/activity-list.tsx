import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export const ActivityList = async() => {

    const {orgId} = auth();

    //check if organization is selected
    if (!orgId) {
        redirect("/select-org");
    }

    //fetch all the audit logs from db
    const auditLogs = await db.auditLog.findMany({
        where: {
            orgId: orgId
        },
        orderBy:{
            createdAt: "desc"
        }
    });

    //displays the default message only if it is the last item, which is when there are no audit logs registered
  return (
    <ol className="space-y-4 mt-4">
        <p className="hidden last:block text-xs text-muted-foreground">
            No activity found inside this organization
        </p>
        {auditLogs.map((log) => (
            <ActivityItem key={log.id} data={log}/>
        ))}
    </ol>
  );
}

ActivityList.Skeleton = function ActivityListSkeleton() {
    return (
        <ol className="space-y-4 mt-4">
            <Skeleton className="w-[80%] h-14"/>
            <Skeleton className="w-[50%] h-14"/>
            <Skeleton className="w-[70%] h-14"/>
            <Skeleton className="w-[80%] h-14"/>
            <Skeleton className="w-[75%] h-14"/>
        </ol>
    );
}