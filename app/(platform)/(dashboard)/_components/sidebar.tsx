"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import {NavItem, Organization } from "./nav-item";

interface SidebarProps {
  storageKey?: string;
}

const Sidebar = ({
  storageKey = "t-sidebar-state", 
  }: SidebarProps
) => {
  // state of variable inside localStorage to keep track if accordion is expanded
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});

  // alias for active organization and isLoaded org value
  const { 
    organization: activeOrganization,
    isLoaded : isLoadedOrg
  } = useOrganization();

  // alias for users list of the organization and isLoaded org list value
  const {
    userMemberships,
    isLoaded: isLoadedOrgList
  } = useOrganizationList({
    userMemberships:{
      infinite: true,
    }
  });

  //creates an array with the keys to use in the organization accordion element
  const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }

      return acc;
    }, []);

  // change expanded value on expand
  const onExpand = (id:string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  //render skeleton of org sidebar on loading
  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]"/>
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton/>
          <NavItem.Skeleton/>
          <NavItem.Skeleton/>
        </div>

      </>
    );
  }


  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">

        <span className="pl-4">
          Workspaces
        </span>
        
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus
              className="h-4 w-4"
            />
          </Link>
        </Button>

      </div>

      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem 
            key = {organization.id}
            isActive = {activeOrganization?.id === organization.id}
            isExpanded = {expanded[organization.id]}
            organization = {organization as Organization}
            onExpand = {onExpand}
          />
        ))}
      </Accordion>
    </>
  )
}

export default Sidebar;