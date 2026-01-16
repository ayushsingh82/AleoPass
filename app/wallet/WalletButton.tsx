"use client";

import React, { FC, useCallback } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useWalletModal } from "@demox-labs/aleo-wallet-adapter-reactui";

export const WalletButton: FC = () => {
  const { publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = useCallback(async () => {
    if (publicKey) {
      try {
        await disconnect();
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
      }
    } else {
      // Open modal to select and connect wallet
      setVisible(true);
    }
  }, [publicKey, disconnect, setVisible]);

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
