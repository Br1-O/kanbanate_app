const ClerkLayout = (
{children}: {
    children: React.ReactNode;
}) => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-slate-500'>
      {children}
    </div>
  );
};

export default ClerkLayout;