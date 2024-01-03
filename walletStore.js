import { create } from "zustand";

const walletStore = create((set) => ({
  network: "",
  setNetworkEth: () => set({ network: "eth" }),
  setNetworkPol: () => set({ network: "pol" }),
  setNetworkBsc: () => set({ network: "bsc" }),
  setNetworkSol: () => set({ network: "sol" }),
  setNetworkSui: () => set({ network: "sui" }),
  setNetworkBlank: () => set({ network: "" }),
}));

export default walletStore;
