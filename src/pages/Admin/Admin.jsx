import Navigation from '@/components/own/Navigation'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from 'axios';
import useDeviceStore from '@/Hook/deiceStore';
export default function Admin() {

  const queryClient = useQueryClient();
const setdevices = useDeviceStore((state) => state.setdevices);
const setrefetch = useDeviceStore((state) => state.setrefetch);
  const {data:itemsData, refetch: rerefetch} = useQuery({
    queryKey: ["adminDashboard",123],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3300/deviceInfromations", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const result = await res.data;
      setdevices(result);
      return result;
    },
  });


  useEffect(() => {
    // setdevices(itemsData);
    setrefetch(rerefetch);
  },[itemsData]);

  return (
    <div>
      <Navigation/>
      <Outlet/>
    </div>
  )
}
