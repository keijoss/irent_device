import { create } from "zustand";

const useDeviceStore = create((set) => ({
  devices: [],
  refetch: null,
  setdevices: (device) => set({ devices: device }),
  setrefetch: (rerefetch) => set({ refetch: rerefetch }),
}));

export default useDeviceStore;
