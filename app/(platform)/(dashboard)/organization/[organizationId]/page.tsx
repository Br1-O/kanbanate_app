import { auth } from "@clerk/nextjs/server";

const OrganizationPage = () => {

    const {userId, orgId} = auth();

    return (
        <div>
            Holi
        </div>
    )
}

export default OrganizationPage;