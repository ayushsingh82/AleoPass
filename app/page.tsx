import Link from "next/link";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#C4FEC2' }}>
      <Navigation />

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
            <Link
              href="/verify"
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition shadow-lg text-center"
            >
              Start KYC Verification
            </Link>
          </div>
        </div>

        {/* The flow */}
        <section id="how-it-works" className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-10">How it works</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold text-black mb-2">Connect wallet</h3>
              <p className="text-black/70">Link your Aleo wallet to AleoPass so your identity is tied to your address.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold text-black mb-2">Complete KYC</h3>
              <p className="text-black/70">Verify your identity with our supported providers (e.g. Persona).</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold text-black mb-2">Mint soulbound NFT</h3>
              <p className="text-black/70">A non-transferable soulbound NFT is minted to your wallet, proving KYC status on-chain.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4 text-xl font-bold">4</div>
              <h3 className="text-xl font-bold text-black mb-2">Get verified</h3>
              <p className="text-black/70">Use your verified status and Aleo credit across dApps that integrate AleoPass.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-black text-center mb-8">Why AleoPass?</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-black mb-2">Soulbound NFTs</h3>
              <p className="text-black/70 text-sm">
                KYC is minted as a non-transferable soulbound ARC-721 NFT, binding identity to your wallet.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-black mb-2">6-month expiry</h3>
              <p className="text-black/70 text-sm">
                Verification expires after 6 months for periodic re-verification and up-to-date status.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-black mb-2">Multi-provider</h3>
              <p className="text-black/70 text-sm">
                Support for Onfido, Persona, and Veriff so users can choose their preferred KYC method.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-black text-center mb-6">Verification API</h2>
          <p className="text-black/70 text-center mb-6">
            Any dApp or wallet can check a user&apos;s KYC status with a simple API call.
          </p>
          <div className="rounded-2xl bg-white p-6 shadow-lg max-w-2xl mx-auto">
            <div className="bg-black/5 rounded-xl p-4 font-mono text-sm overflow-x-auto text-black">
              <p className="text-black/60 mb-2"># Request</p>
              <p>GET /api/verify?wallet=aleo_address</p>
              <p className="text-black/60 mt-4 mb-2"># Response</p>
              <p>{`{`}</p>
              <p className="ml-4">&quot;verified&quot;: true,</p>
              <p className="ml-4">&quot;expirationBlock&quot;: 12766086,</p>
              <p className="ml-4">&quot;ownerId&quot;: &quot;6343611107...&quot;</p>
              <p>{`}`}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 text-center">
          <div className="rounded-3xl bg-white p-12 shadow-2xl max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-black mb-4">Ready to Get Verified?</h2>
            <p className="text-black/70 text-lg mb-8">
              Connect your wallet and complete KYC to receive your soulbound verification NFT
            </p>
            <Link
              href="/verify"
              className="inline-block bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition"
            >
              Go to Verify
            </Link>
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

