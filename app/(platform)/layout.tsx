import { ModalProvider } from '@/components/providers/modal-providers';
import { QueryProvider } from '@/components/providers/query-provider';
import {ClerkProvider} from '@clerk/nextjs';
import { Toaster } from "sonner";

const PlatflormLayout = (
{children}: {
    children: React.ReactNode;
}) => {
  return (
    <div className="h-full w-full">
      <ClerkProvider>
          <QueryProvider>
            <Toaster />
            <ModalProvider />
            {children}
          </QueryProvider>
      </ClerkProvider>
    </div>
  );
};

export default PlatflormLayout;