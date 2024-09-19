import { auth } from "@clerk/nextjs/server";

const OrganizationPage = () => {

    const {userId, orgId} = auth();

    return (
        <div className="bg-gray-400">

        </div>
    )
}

export default OrganizationPage;