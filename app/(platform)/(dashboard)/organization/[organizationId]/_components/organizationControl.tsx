"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

// This component will act as a middleware to control the set active of the current organization
// based on the params
const OrganizationControl = () => {

    const params = useParams();
    const { setActive } = useOrganizationList();

    useEffect(() => {

        if (!setActive) return; 

        setActive({
            organization: params.organizationId as string,
        });

    }, [setActive, params.organizationId]);


  return null;
}

export default OrganizationControl;