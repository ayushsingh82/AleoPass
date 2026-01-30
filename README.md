# AleoPass

A KYC verification protocol for Aleo that mints soulbound NFTs to verified wallets. Link your identity to your Aleo address with privacy-preserving, non-transferable verification tokens.

## Live Deployment

| Resource | Link |
|----------|------|
| **Program ID** | `nftkyc_v13.aleo` |
| **Network** | Testnet |
| **Status** | Deployed |
| **Transaction** | [`at1pr48c4ay5yj8lhjpea0sdh7p0cfv0y5fs9730kztupzzdltuxsyqt6l9nn`](https://testnet.explorer.provable.com/transaction/at1pr48c4ay5yj8lhjpea0sdh7p0cfv0y5fs9730kztupzzdltuxsyqt6l9nn) |
| **Program Explorer** | [View on Provable](https://testnet.explorer.provable.com/program/nftkyc_v13.aleo) |
| **Authorized Minter** | `aleo12v4hjyh4gmrlc57amxfeepfvmvdwmaskqczexfw2ctfa3hql7g9sukj33u` |

## How It Works

### For Users

1. **Connect Wallet** - Link your Aleo wallet to AleoPass
2. **Complete KYC** - Verify identity through Onfido, Persona, or Veriff
3. **Receive NFT** - A soulbound ARC-721 NFT is minted to your address
4. **Stay Verified** - NFT is valid for 6 months, then requires re-verification

### For dApps

Query the verification API to check if an address has valid KYC:

```json
{
  "verified": true,
  "expirationBlock": 12766086,
  "kycLevel": 2,
  "provider": "onfido"
}
```

## Security Model

| Feature | Description |
|---------|-------------|
| **Soulbound** | NFTs cannot be transferred to another address |
| **Single Minter** | Only the authorized address can mint new verifications |
| **6-Month Expiry** | Forces periodic re-verification for continued validity |
| **Private Data** | All record data is encrypted using Aleo's ZK proofs |

## Quick Start

### Prerequisites

- Node.js 18+
- Leo CLI ([Installation Guide](https://developer.aleo.org/leo/installation))
- Leo Wallet browser extension

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to access the application.

## Project Structure

```
AleoPass/
├── app/
│   ├── page.tsx              # Home / landing page
│   ├── verify/page.tsx       # KYC verification flow
│   ├── check-status/page.tsx # Verification status checker
│   ├── components/           # Shared React components
│   └── wallet/               # Wallet integration utilities
├── program/
│   ├── src/main.leo          # nftkyc_v13.aleo source code
│   └── README.md             # Program documentation
└── public/                   # Static assets
```

## KYC NFT Program

The `nftkyc_v13.aleo` program implements an ARC-721 compliant soulbound NFT system:

### Record Structure

```leo
record KYCVerification:
    owner as address.private;
    kyc_level as u8.private;        // 1: Basic, 2: Intermediate, 3: Enhanced
    provider as u8.private;          // 0: Onfido, 1: Persona, 2: Veriff
    expiration_block as u64.private;
    minted_at_block as u64.private;
```

### Functions

| Function | Description | Access |
|----------|-------------|--------|
| `mint` | Mint KYC NFT to address | Minter only |
| `verify_kyc` | Check if verification is valid | Public |
| `get_verification_details` | Get full verification data | Owner only |

### KYC Levels

| Level | Type | Requirements |
|-------|------|--------------|
| 1 | Basic | Email + Phone |
| 2 | Intermediate | ID Document |
| 3 | Enhanced | ID + Liveness Check |

### Supported Providers

- **Onfido** - Document verification + biometrics
- **Persona** - Identity verification platform
- **Veriff** - AI-powered identity verification

## Environment Variables

Create a `.env.local` file:

```env
# Deployment
ALEO_PRIVATE_KEY=

# KYC Providers (configure one or more)
ONFIDO_API_KEY=
PERSONA_API_KEY=
VERIFF_API_KEY=

# Optional
DATABASE_URL=
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Smart Contracts | Leo / Aleo |
| NFT Standard | ARC-721 (Soulbound) |
| KYC Providers | Onfido, Persona, Veriff |
| Wallet | Leo Wallet Adapter |

## Resources

- [Aleo Developer Docs](https://developer.aleo.org/)
- [ARC-721 Standard](https://github.com/AleoHQ/arcs)
- [Aleo Testnet Explorer](https://testnet.explorer.provable.com/)

## License

MIT
