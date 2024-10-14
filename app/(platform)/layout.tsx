import {ClerkProvider} from '@clerk/nextjs';
import { Toaster } from "sonner";

const PlatflormLayout = (
{children}: {
    children: React.ReactNode;
}) => {
  return (
    <div>
      <ClerkProvider>
          <Toaster />
          {children}
      </ClerkProvider>
    </div>
  );
};

export default PlatflormLayout;