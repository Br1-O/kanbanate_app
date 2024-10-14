import { startCase } from "lodash";
import OrganizationControl from "./_components/organizationControl";
import { auth } from "@clerk/nextjs";

//function to change the title attribute from the window to display the organization's name
export async function generateMetadata() {

  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization"),
  };
};

const OrganizationIdLayout = (
    {children}: {
        children: React.ReactNode;
    }) => {
      return (
        <>
            <OrganizationControl/>
            {children}
        </>
      );
    };
    
export default OrganizationIdLayout;