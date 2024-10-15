"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

//generic function to reOrder the lists
function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

export const ListContainer = ({
    data,
    boardId
}: ListContainerProps) => {

    //will save the lists in a state to be modified before db changes
    const [orderedData, setOrderedData] = useState(data);

    //hook to update the order of the list
    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success("List reordered");
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    //hook to update the order of the cards
    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: () => {
            toast.success("Card reordered");
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    //if data changes, changes the state
    useEffect(() => {
      setOrderedData(data);

    }, [data]);

    //handler for dragEnd
    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;

        //check if the destination for the drag action is valid
        if (!destination) {
            return;
        }

        //if element was dropped in the same position
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        //if a list is moved
        if (type === "list") {

            //reorder the items in the list
            const items = reOrder(
                orderedData,
                source.index,
                destination.index
            ).map((item, index) => ({...item, order: index})); //change the item order to match the index

            //mutate the state
            setOrderedData(items);

            //execute server action to update lists order
            executeUpdateListOrder({ items, boardId });
        }

        //if a card is moved
        if (type === "card") {

            let newOrderedData = [...orderedData];

            //find source and destination list
            const sourceList = newOrderedData.find((list) => (list.id) === (source.droppableId));
            const destinationList = newOrderedData.find((list) => (list.id) === (destination.droppableId));

            //if no list matches source or destination list
            if (!sourceList || !destinationList) {
                return;
            }

            //check if the source list is empty
            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            //check if the destination list is empty
            if (!destinationList.cards) {
                destinationList.cards = [];
            }

            //moving the card in the same list
            if (source.droppableId === destination.droppableId) {
                const reorderedCards = reOrder(
                    sourceList.cards,
                    source.index,
                    destination.index
                );

                //change the order attribute of each card in the list to match its current position
                reorderedCards.forEach((card, index) => {
                    card.order = index;
                });

                //change the source list cards array for the new one
                sourceList.cards = reorderedCards;

                //save into state
                setOrderedData(newOrderedData);

                //execute server action to change the cards order in the same list
                executeUpdateCardOrder({
                    boardId: boardId,
                    items: reorderedCards
                });

                //moving the card to a different list
            } else{
                //remove the card from the source list
                const [movedCard] = sourceList.cards.splice(source.index, 1);

                //assign the new listId to the moved card
                movedCard.listId = destination.droppableId;

                //add card to the destination list
                destinationList.cards.splice(destination.index, 0, movedCard);

                //change the order attribute of each card in the source list to match its current position
                sourceList.cards.forEach((card, index) => {
                    card.order = index;
                });

                //change the order attribute of each card in the destination list to match its current position
                destinationList.cards.forEach((card, index) => {
                    card.order = index;
                });

                //save into state
                setOrderedData(newOrderedData);

                //execute server action to change the cards order in different lists
                executeUpdateCardOrder({
                    boardId: boardId,
                    items: destinationList.cards
                });            
            }
        }
    }

    //dragDropContext and Droppable will allow the drag&drop feature of the lists
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {( provided ) => (
                <ol 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex gap-x-3 h-full"
                >
                    {orderedData.map((list, index) => {
                        return (
                            <ListItem
                                key= {list.id}
                                index= {index}
                                data= {list}
                            />
                        );
                    })}
                    {provided.placeholder}
                    <ListForm />
                    <div className="flex-shrink-0 w-1" />
                </ol>
                )}
            </Droppable>
        </DragDropContext>

    )
}