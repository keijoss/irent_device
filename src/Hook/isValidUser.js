import axios from "axios";
import useUserStoreInformation from "./userStoreInformation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const isValidUser = () => {
  const setAuthenticatedUser = useUserStoreInformation(
    (state) => state.setAuthenticatedUser
  );
  const authenticatedUser = useUserStoreInformation(
    (state) => state.authenticatedUser
  );

  const navigator = useNavigate();

  const token = localStorage.getItem("token");
 
  useEffect(() => {
const verifyfunction = async () => {
   if (token === null || !token) {
     navigator("/");
     return false;
   }

  try {
    const verify = await axios.get("http://localhost:3300/auth/verify", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const user = await verify.data;
    setAuthenticatedUser(user);
    return user;
  } catch (error) {
    console.log("sdfdsfdsf");
        navigator("/", { replace: true });

    console.log(error);
    setAuthenticatedUser(error);
    console.log(authenticatedUser);
    return false;
  }
};
verifyfunction();
  },[])
  
  return authenticatedUser;
};
