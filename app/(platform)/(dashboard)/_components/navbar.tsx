import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">

        {/* TODO: Mobile Sidebar */}

        <div className="flex items-center gap-x-4 ">

            <div className="hidden md:flex">
                <Logo/>
            </div>

            <Button size="sm" variant="primary" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                Create
            </Button>

            <Button size="sm" variant="primary" className="rounded-sm md:hidden">
                <Plus className="h-4 w-4"/>
            </Button>

            <div className="ml-auto flex items-center gap-x-2">
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

    </div>
  )
}

export default Navbar;