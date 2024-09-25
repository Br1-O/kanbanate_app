import OrganizationControl from "./_components/organizationControl";

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