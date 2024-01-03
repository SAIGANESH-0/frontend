"use client";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  bsc,
  sepolia,
  bscTestnet,
  polygonMumbai,
} from "wagmi/chains";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo, useState } from "react";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletKitProvider } from "@mysten/wallet-kit";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const chains = [mainnet, polygon, bsc, sepolia, bscTestnet, polygonMumbai];
const projectId = "77536652c0ae880075fbf4bc5b5e845f";
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function RootLayout({ children }) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new GlowWalletAdapter(),
      new MathWalletAdapter(),
    ],
    []
  );

  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);
  return (
    <html lang="en">
      <body>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WagmiConfig config={wagmiConfig}>
              <WalletKitProvider>
                <Header />
                {children}
                <Footer />
              </WalletKitProvider>
            </WagmiConfig>
          </WalletProvider>
        </ConnectionProvider>

        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        <ToastContainer position="top-center" />
      </body>
    </html>
  );
}
