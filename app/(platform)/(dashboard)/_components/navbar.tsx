import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form-popover";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">

        <MobileSidebar/>

        <div className="flex items-center gap-x-4 ">

            <div className="hidden md:flex">
                <Logo/>
            </div>

            <FormPopover align="start" side="bottom" sideOffset={18}>
                <Button size="sm" variant="primary" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                    Create
                </Button>
            </FormPopover>

            <FormPopover>
                <Button size="sm" variant="primary" className="rounded-sm md:hidden">
                    <Plus className="h-4 w-4"/>
                </Button>
            </FormPopover>

            <div className="flex items-center gap-x-2 ml-auto">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl = "/organization/:id"
                    afterLeaveOrganizationUrl = "/select-org"
                    afterSelectOrganizationUrl = "/organization/:id"
                    appearance={{                   
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }
                    }}
                />

                <UserButton
                    afterSignOutUrl = "/sign-in"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30
                            }
                        }
                    }}
                />
            </div>

        </div>

    </nav>
  )
}

export default Navbar;