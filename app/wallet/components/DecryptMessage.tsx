"use client";

import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, useCallback } from "react";

export const DecryptMessage: FC = () => {
  const { publicKey, decrypt } = useWallet();

  const onClick = useCallback(async () => {
    const cipherText = "record....";
    if (!publicKey) throw new WalletNotConnectedError();
    if (decrypt) {
      const decryptedPayload = await decrypt(cipherText);
      alert("Decrypted payload: " + decryptedPayload);
    }
  }, [publicKey, decrypt]);

  return (
    <button onClick={onClick} disabled={!publicKey}>
      Decrypt message
    </button>
  );
};
