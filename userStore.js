import { create } from "zustand";

const userStore = create((set) => ({
  logged: false,
  setLoggedin: () => set({ logged: true }),
  setLoggedOut: () => set({ logged: false }),
}));

export default userStore;
