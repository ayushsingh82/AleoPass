"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import Navigation from "../components/Navigation";

export default function CheckStatusPage() {
  const { publicKey } = useWallet();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-fill address when wallet is connected
  useEffect(() => {
    if (publicKey && !address) {
      setAddress(publicKey);
    }
  }, [publicKey, address]);

  const handleCheckStatus = async () => {
    if (!address.trim()) {
      setError("Please enter a wallet address");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // TODO: Call the verify_kyc function from the deployed program
      // For now, we'll simulate the check
      console.log("Checking status for address:", address);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would be replaced with actual program call
      setResult({
        verified: false,
        message: "Status check functionality will be implemented with program integration"
      });
    } catch (err: any) {
      setError(err.message || "Failed to check status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#C4FEC2' }}>
      <Navigation />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-black mb-2">Check Verify Status</h1>
          <p className="text-black/70 mb-8">
            Enter a wallet address to check its KYC verification status on the Aleo blockchain.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-black font-semibold mb-2">
                Wallet Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="aleo1..."
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white font-mono"
              />
              <p className="text-sm text-black/60 mt-2">
                {publicKey 
                  ? "Your connected wallet address has been auto-filled" 
                  : "Enter the Aleo wallet address you want to verify"}
              </p>
            </div>

            <button
              onClick={handleCheckStatus}
              disabled={loading || !address.trim()}
              className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Checking..." : "Check Status"}
            </button>

            {error && (
              <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4">
                <p className="text-red-800 font-medium">Error: {error}</p>
              </div>
            )}

            {result && (
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-xl font-bold text-black mb-4">Verification Status</h3>
                <div className="space-y-2">
                  <p className="text-black">
                    <span className="font-semibold">Address:</span> {address}
                  </p>
                  <p className="text-black">
                    <span className="font-semibold">Verified:</span>{" "}
                    <span className={result.verified ? "text-green-600" : "text-red-600"}>
                      {result.verified ? "Yes" : "No"}
                    </span>
                  </p>
                  {result.message && (
                    <p className="text-black/70 text-sm mt-4">{result.message}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
