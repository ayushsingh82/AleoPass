import Image from "next/image";
import Link from "next/link";
import { WalletButton } from "./wallet/WalletButton";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#C4FEC2' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="black"/>
            <path d="M30 65 L50 25 L70 65 Z" fill="#C4FEC2" stroke="#C4FEC2" strokeWidth="3" strokeLinejoin="round"/>
            <circle cx="50" cy="55" r="8" fill="black"/>
            <path d="M35 72 Q50 80 65 72" stroke="#C4FEC2" strokeWidth="4" strokeLinecap="round" fill="none"/>
          </svg>
          <span className="text-2xl font-bold text-black">AleoPass</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/check-status" className="text-black hover:underline font-medium cursor-pointer">Check Verify Status</Link>
          <Link href="/verify" className="text-black hover:underline font-medium cursor-pointer">Verify</Link>
          <WalletButton />
        </nav>
        <div className="md:hidden flex items-center gap-4">
          <Link href="/check-status" className="text-black hover:underline font-medium text-sm cursor-pointer">Check Status</Link>
          <Link href="/verify" className="text-black hover:underline font-medium text-sm cursor-pointer">Verify</Link>
          <WalletButton />
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-6">
            KYC Verification for Aleo
          </h1>
          <p className="text-xl md:text-2xl text-black/80 mb-10 max-w-2xl mx-auto">
            Link your KYC identity to your Aleo wallet with a soulbound NFT. 
            Secure, private, and verifiable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition shadow-lg">
              Start KYC Verification
            </button>
          </div>
        </div>

        {/* Features Cards */}
        <section id="features" className="mt-32">
          <h2 className="text-4xl font-bold text-black text-center mb-12">Why AleoPass?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Soulbound NFTs</h3>
              <p className="text-black/70 text-lg">
                Your KYC verification is minted as a non-transferable soulbound ARC-721 NFT, truly binding identity to your wallet.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">6-Month Expiry</h3>
              <p className="text-black/70 text-lg">
                Verification expires after 6 months, forcing periodic re-verification and ensuring up-to-date identity status.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Multi-Provider</h3>
              <p className="text-black/70 text-lg">
                Support for Onfido, Persona, and Veriff KYC providers, giving users flexibility in verification methods.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mt-32">
          <h2 className="text-4xl font-bold text-black text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-lg text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold text-black mb-2">Connect Wallet</h3>
              <p className="text-black/70">Link your Aleo wallet to AleoPass</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold text-black mb-2">Complete KYC</h3>
              <p className="text-black/70">Verify your identity with our supported providers</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold text-black mb-2">Mint NFT</h3>
              <p className="text-black/70">Soulbound NFT is minted to your address</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-xl font-bold text-black mb-2">Get Verified</h3>
              <p className="text-black/70">Use your verified status across dApps</p>
            </div>
          </div>
        </section>

        {/* API Section */}
        <section id="api" className="mt-32">
          <div className="rounded-3xl bg-white p-10 shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-black text-center mb-6">Simple Verification API</h2>
            <p className="text-black/70 text-center mb-8 text-lg">
              Any dApp or wallet can verify a user's KYC status with a simple API call
            </p>
            <div className="bg-gray-100 rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <p className="text-gray-600 mb-2"># Request</p>
              <p className="text-purple-600">GET</p>
              <p className="text-black">/api/verify?wallet=aleo_address</p>
              <p className="text-gray-600 mt-4 mb-2"># Response</p>
              <p className="text-black">{`{`}</p>
              <p className="text-black ml-4">"verified": true,</p>
              <p className="text-black ml-4">"expirationBlock": 12766086,</p>
              <p className="text-black ml-4">"ownerId": "6343611107..."</p>
              <p className="text-black">{`}`}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 text-center">
          <div className="rounded-3xl bg-white p-12 shadow-2xl max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-black mb-4">Ready to Get Verified?</h2>
            <p className="text-black/70 text-lg mb-8">
              Connect your wallet and complete KYC to receive your soulbound verification NFT
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-8 py-10 mt-20 border-t-2 border-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="black"/>
              <path d="M30 65 L50 25 L70 65 Z" fill="#C4FEC2" stroke="#C4FEC2" strokeWidth="3" strokeLinejoin="round"/>
              <circle cx="50" cy="55" r="8" fill="black"/>
              <path d="M35 72 Q50 80 65 72" stroke="#C4FEC2" strokeWidth="4" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="text-xl font-bold text-black">AleoPass</span>
          </div>
          <p className="text-black/60">© 2024 AleoPass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

