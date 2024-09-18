import {ClerkProvider} from '@clerk/nextjs';

const PlatflormLayout = (
{children}: {
    children: React.ReactNode;
}) => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <ClerkProvider>
          {children}
      </ClerkProvider>
    </div>
  );
};

export default PlatflormLayout;