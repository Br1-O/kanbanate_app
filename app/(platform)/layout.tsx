import {ClerkProvider} from '@clerk/nextjs';

const PlatflormLayout = (
{children}: {
    children: React.ReactNode;
}) => {
  return (
    <div>
      <ClerkProvider>
          {children}
      </ClerkProvider>
    </div>
  );
};

export default PlatflormLayout;