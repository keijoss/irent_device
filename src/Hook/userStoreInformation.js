import {create} from 'zustand';


 const useUserStoreInformation = create((set) => ({
   authenticatedUser: null,
   setAuthenticatedUser: (user) => set({ authenticatedUser: user }),
 }));



export default useUserStoreInformation;