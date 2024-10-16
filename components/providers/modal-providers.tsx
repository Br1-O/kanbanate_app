"use client";

import { CardModal } from "@/components/modals/card-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
    
    //assures that the component will be displayed only when isMounted is set to true
    if (!isMounted) {
        return null;
    }

  return (
    <>
        <CardModal />
    </>
  )
}
