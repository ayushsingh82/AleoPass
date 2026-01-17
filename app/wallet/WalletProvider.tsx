"use client";

import React, { FC, useMemo, ReactNode } from "react";
import { WalletProvider as AleoWalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider, WalletModal } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

// Default styles that can be overridden by your app
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "AleoPass",
      }),
    ],
    []
  );

  return (
    <AleoWalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Testnet}
      autoConnect={false}
      onError={(error) => {
        console.error("Wallet provider error:", error);
        // Log detailed error info
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
      }}
    >
      <WalletModalProvider>
        {children}
        <WalletModal />
      </WalletModalProvider>
    </AleoWalletProvider>
  );
};
