"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

export const ListContainer = ({
    data,
    boardId
}: ListContainerProps) => {

    //will save the lists in a state to be modified before db changes
    const [orderedData, setOrderedData] = useState(data);
    useEffect(() => {
      setOrderedData(data);

    }, [data]);

    //dragDropContext and Droppable will allow the drag&drop feature of the lists
    return (
        <DragDropContext onDragEnd={() => {}}>
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