"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import Navigation from "../components/Navigation";

export default function VerifyPage() {
  const { publicKey } = useWallet();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [personaFormSubmitted, setPersonaFormSubmitted] = useState(false);
  const [kycFullName, setKycFullName] = useState("");
  const [kycIdType, setKycIdType] = useState("");
  const [kycDocFiles, setKycDocFiles] = useState<File[]>([]);

  // Auto-fill address when wallet is connected
  useEffect(() => {
    if (publicKey && !address) {
      setAddress(publicKey);
    }
  }, [publicKey, address]);

  const providers = [
    { id: "onfido", name: "Onfido", comingSoon: true },
    { id: "persona", name: "Persona", comingSoon: false },
    { id: "veriff", name: "Veriff", comingSoon: true },
  ];

  const handleNext = () => {
    if (step === 1 && address.trim()) {
      setStep(2);
    } else if (step === 2 && selectedProvider) {
      setPersonaFormSubmitted(false);
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      if (step === 3 && selectedProvider === "persona") setPersonaFormSubmitted(false);
      setStep(step - 1);
    }
  };

  const handlePersonaFormSubmit = () => {
    setPersonaFormSubmitted(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("Submitting verification:", {
        address,
        provider: selectedProvider,
        documents: documents.length,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Verification submitted! This will be processed and an NFT will be minted upon approval.");
      setStep(1);
      setAddress("");
      setSelectedProvider("");
      setDocuments([]);
    } catch (error: unknown) {
      alert("Error: " + (error instanceof Error ? error.message : "Failed to submit verification"));
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">KYC Verification</h1>
            <p className="text-black/70 mb-6">
              Complete your KYC verification to receive a soulbound NFT on your Aleo wallet.
            </p>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`flex-1 flex items-center ${s < 3 ? 'flex' : ''}`}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step >= s
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step > s ? "bg-black" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-black/70">
              <span>Enter Address</span>
              <span>Select Provider</span>
              <span>Upload Documents</span>
            </div>
          </div>

          {/* Step 1: Enter Address */}
          {step === 1 && (
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
                    : "Enter the Aleo wallet address where you want to receive your KYC NFT"}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleNext}
                  disabled={!address.trim()}
                  className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Provider */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-black font-semibold mb-4">
                  Select KYC Provider
                </label>
                <div className="grid gap-4">
                  {providers.map((provider) => (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => !provider.comingSoon && setSelectedProvider(provider.id)}
                      disabled={provider.comingSoon}
                      className={`p-4 border-2 rounded-lg text-left transition ${
                        provider.comingSoon
                          ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-75"
                          : selectedProvider === provider.id
                            ? "border-black bg-black/5"
                            : "border-gray-300 hover:border-black/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-black">{provider.name}</span>
                        {provider.comingSoon ? (
                          <span className="text-sm text-gray-500 font-medium">Coming soon</span>
                        ) : selectedProvider === provider.id ? (
                          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedProvider}
                  className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Persona KYC or Upload Documents */}
          {step === 3 && (
            <div className="space-y-6">
              {selectedProvider === "persona" ? (
                <>
                  {personaFormSubmitted ? (
                    <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                      <p className="text-green-800 font-semibold mb-2">KYC under verification</p>
                      <p className="text-green-700 text-sm mb-4">
                        Your documents and information have been submitted. You will receive the verification result within 24 hours.
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={handleBack}
                          className="flex-1 bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => {
                            setStep(1);
                            setAddress("");
                            setSelectedProvider("");
                            setPersonaFormSubmitted(false);
                            setKycFullName("");
                            setKycIdType("");
                            setKycDocFiles([]);
                          }}
                          className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                        >
                          Start over
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-black font-semibold mb-2">
                          Submit your details for verification
                        </label>
                        <p className="text-black/70 text-sm mb-4">
                          Provide your information and documents. Your wallet address is linked as the reference.
                        </p>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-black/80 mb-1">Full name</label>
                            <input
                              type="text"
                              value={kycFullName}
                              onChange={(e) => setKycFullName(e.target.value)}
                              placeholder="e.g. John Doe"
                              className="w-full px-4 py-2 border border-black/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 text-black bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-black/80 mb-1">ID type</label>
                            <select
                              value={kycIdType}
                              onChange={(e) => setKycIdType(e.target.value)}
                              className="w-full px-4 py-2 border border-black/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 text-black bg-white"
                            >
                              <option value="">Select document type</option>
                              <option value="passport">Passport</option>
                              <option value="national_id">National ID</option>
                              <option value="drivers_license">Driver&apos;s license</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-black/80 mb-1">Document (optional)</label>
                            <div className="border-2 border-dashed border-black/30 rounded-lg p-4 text-center">
                              <input
                                type="file"
                                multiple
                                accept="image/*,.pdf"
                                onChange={(e) => e.target.files && setKycDocFiles(Array.from(e.target.files))}
                                className="hidden"
                                id="persona-doc-upload"
                              />
                              <label htmlFor="persona-doc-upload" className="cursor-pointer text-sm text-black/70">
                                Click to upload ID or passport (PDF, PNG, JPG)
                              </label>
                              {kycDocFiles.length > 0 && (
                                <p className="mt-2 text-xs text-black/60">
                                  {kycDocFiles.length} file(s) selected
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handleBack}
                          className="flex-1 bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                          Back
                        </button>
                        <button
                          onClick={handlePersonaFormSubmit}
                          className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                        >
                          Submit for verification
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-black font-semibold mb-2">
                      Upload Documents
                    </label>
                    <div className="border-2 border-dashed border-black rounded-lg p-8 text-center">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        accept="image/*,.pdf"
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <svg className="w-12 h-12 text-black mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-black font-medium">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-sm text-black/60 mt-2">
                          PDF, PNG, JPG (MAX. 10MB each)
                        </span>
                      </label>
                    </div>
                    {documents.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-semibold text-black">Uploaded Files:</p>
                        {documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                            <span className="text-sm text-black">{doc.name}</span>
                            <span className="text-xs text-black/60">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-black/60 mt-4">
                      Upload your identity documents (ID, passport, driver&apos;s license, etc.)
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleBack}
                      className="flex-1 bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading || documents.length === 0}
                      className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Submitting..." : "Submit Verification"}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
