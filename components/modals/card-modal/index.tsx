"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";

import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Description } from "./description";
import { Actions } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";

export const CardModal = () => {

    //bring the states of the modal
    const id = useCardModal((state) => state.id);
    const isOpen = useCardModal((state) => state.isOpen);
    const onClose = useCardModal((state) => state.onClose);

    //query to api route on server side to fetch the card's data from db
    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`)
    });

    //query to api route on server side to fetch the card's audit logs data from db
    const { data: auditLogsData } = useQuery<AuditLog[]>({
        queryKey: ["card-logs", id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`)
    });

  return (
    <Dialog
        open={isOpen}
        onOpenChange={onClose}
    >
        <DialogContent aria-describedby={"card "+id}>
            <DialogTitle />
            {!cardData ?
                <Header.Skeleton />
            :
            <Header data={cardData} />
            }
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                <div className="col-span-3">
                    <div className="w-full space-y-6">
                        {!cardData ?
                            <Description.Skeleton />
                        :
                            <Description data={cardData}/>
                        }
                        {!auditLogsData ?
                            <Activity.Skeleton />
                        :
                            <Activity items={auditLogsData}/>
                        }
                    </div>
                </div>
                {!cardData ?
                    <Actions.Skeleton />
                :
                    <Actions data={cardData} />
                }
            </div>
        </DialogContent>
    </Dialog>
  );
}
