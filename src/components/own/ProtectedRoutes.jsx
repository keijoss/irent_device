import { isValidUser } from "@/Hook/isValidUser";
import useUserStoreInformation from "@/Hook/userStoreInformation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoutesAdmin({ children }) {
  const naviate = useNavigate();
  const verifyUser = isValidUser();

  if (verifyUser?.role_id === 2) {
    naviate("/customer", { replace: true });
  }
  return children;
}

export function ProtectedRoutesCustomer({ children }) {
  const naviate = useNavigate();
  const verifyUser = isValidUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (verifyUser?.role_id === 1) {
      naviate("/admin", { replace: true });
    }else if (verifyUser?.role_id === 2) {
      setIsLoading(false);
    }
    
  }, [verifyUser]);
    
  
  if(isLoading){
     return <div>Loading...</div>
    }else{

      return children;
    }
}
