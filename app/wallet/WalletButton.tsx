"use client";

import React, { FC, useCallback, useEffect } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useWalletModal } from "@demox-labs/aleo-wallet-adapter-reactui";

export const WalletButton: FC = () => {
  const { publicKey, disconnect, connecting, wallet, connected, connect } = useWallet();
  const { setVisible } = useWalletModal();

  // Log wallet state for debugging
  useEffect(() => {
    console.log("Wallet state:", { 
      publicKey, 
      connecting, 
      connected, 
      wallet: wallet?.adapter?.name,
      readyState: wallet?.adapter?.readyState
    });
  }, [publicKey, connecting, connected, wallet]);

  const handleClick = useCallback(async () => {
    if (publicKey) {
      try {
        await disconnect();
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
      }
    } else {
      // If wallet is detected and ready, try to connect directly
      if (wallet?.adapter && wallet.adapter.readyState === 'Installed') {
        console.log("Wallet detected, attempting direct connection");
        try {
          await connect();
        } catch (error) {
          console.error("Direct connection failed, opening modal:", error);
          // Fallback to modal if direct connection fails
          setVisible(true);
        }
      } else {
        // Open modal to select and connect wallet
        console.log("Opening wallet selection modal");
        setVisible(true);
      }
    }
  }, [publicKey, disconnect, setVisible, wallet, connect]);

  return (
    <button
      onClick={handleClick}
      disabled={connecting}
      className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {connecting
        ? "Connecting..."
        : publicKey
        ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
};
