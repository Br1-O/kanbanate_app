import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";

//function to change the title attribute from the window to display the selected board's name
export async function generateMetadata({
    params
}: {
    params: { boardId: string }
}) {

    const { orgId } = auth();

    //check if there is an organization selected
    if (!orgId) {
        return {
            title: "Board"
        }
    }

    //fetch the board's info
    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId: orgId
        }
    });
  
    return {
      title: board?.title || "Board"
    }
};
  

const BoardIdLayout = async({
    children,
    params
}: {
    children: React.ReactNode;
    params: {boardId: string};
}) => {

    const {orgId} = auth();

    //check if there is an organization selected
    if (!orgId) {
        redirect("/select-org");
    }

    //fetch board's data
    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId: orgId
        },
    });

    if(!board) {
        notFound();
    }

  return (
    <div
        className="relative h-full bg-no-repeat bg-cover bg-center"
        style={{backgroundImage: `url(${board.imageFullUrl})` }}
    >
        <BoardNavbar data={board} />
        <div className="absolute inset-0 bg-black/10" />
        <main className="relative pt-28 h-full">
            {children}
        </main>
    </div>
  );
}

export default BoardIdLayout;