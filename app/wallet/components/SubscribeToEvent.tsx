"use client";

import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import React, { FC, useEffect, useCallback } from "react";

interface SubscribeToEventProps {
  children?: React.ReactNode;
}

export const SubscribeToEvent: FC<SubscribeToEventProps> = ({ children }) => {
  const { wallet, publicKey } = useWallet();

  const handleAccountChange = useCallback(() => {
    // Handle account change, reconnect
    console.log("Account changed");
  }, [wallet]);

  useEffect(() => {
    if (wallet?.adapter) {
      (wallet.adapter as LeoWalletAdapter).on("accountChange", handleAccountChange);
      // Removes event listener during component teardown
      return () => {
        (wallet.adapter as LeoWalletAdapter).off(
          "accountChange",
          handleAccountChange
        );
      };
    }
  }, [wallet, publicKey, handleAccountChange]);

  return <>{children}</>;
};
