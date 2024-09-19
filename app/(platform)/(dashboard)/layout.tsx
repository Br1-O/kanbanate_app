import {ClerkProvider} from '@clerk/nextjs';
import Navbar from './_components/navbar';

const DashboardLayout = (
{children}: {
    children: React.ReactNode;
}) => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <Navbar/>
        {children}
    </div>
  );
};

export default DashboardLayout;