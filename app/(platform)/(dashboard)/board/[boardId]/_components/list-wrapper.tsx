interface ListWrapperProps {
    children: React.ReactNode;
}

//wrapper for listForm
export const ListWrapper = ({
    children
}: ListWrapperProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
        {children}
    </li>
  );
}