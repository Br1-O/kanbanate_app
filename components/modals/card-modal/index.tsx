"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";

import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { DialogTitle } from "@radix-ui/react-dialog";

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
        </DialogContent>
    </Dialog>
  );
}
