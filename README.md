# AleoPass - KYC Verification Protocol for Aleo

AleoPass is a protocol that links KYC verification to Aleo wallets by minting a soulbound ARC-721 NFT upon successful verification through Onfido, Persona, or Veriff.

## What It Does

AleoPass provides two main flows:

### User Application Flow

1. **Connect**: Users link their Aleo wallet to the application
2. **KYC**: Integrated KYC flow for country selection, document upload, and verification via supported providers
3. **Mint**: On successful verification, a soulbound ARC-721 NFT is minted to the user's address
   - Non-transferable (truly "binds" to the address)
   - Expires after 6 months (via block-based timestamp)
4. **Indexing**: Minted tokens are discoverable via the verification API

### dApp/Wallet Verification API Flow

Integrators can verify KYC status by calling the verification API:

**Response:**
```json
{
  "verified": true,
  "expirationBlock": 12766086,
  "ownerId": "6343611107927098604630691271078901602104165424204935641345654800195321857336field"
}
```

## Security Model

- **Soulbound NFT**: Non-transferable, preventing KYC from being moved to another address
- **Single Deployer**: Only the designated deployer key can mint, preventing spoofing
- **6-Month Expiry**: Forces periodic re-verification

**Note**: Transferring a KYC'd address requires sharing private keys, which defeats wallet security entirely.

### NFT Metadata

Each NFT can include:
- `kyc_level`: basic, intermediate, or enhanced
- `provider`: Onfido, Persona, or Veriff

## Architecture

### Core Contract/Program
- Forked ARC-721 implementation
- Transfers disabled for soulbound properties
- Minting restricted to deployer only

### Frontend/API
- Wallet connection (Aleo + ANS support)
- KYC provider integration
- Minting pipeline with proof polling (up to 5 minutes for proof generation)
- Verification API and gallery display

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Aleo Wallet/Private Key for deployment
ALEO_PRIVATE_KEY=

# ANS (Aleo Name Service) configuration
ANS_API_KEY=

# KYC Provider Keys
SUMSUB_API_KEY=
ONFIDO_API_KEY=
PERSONA_API_KEY=
VERIFF_API_KEY=

# Database/Backend
DATABASE_URL=
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Blockchain**: Aleo
- **NFT Standard**: ARC-721
- **KYC Providers**: Onfido, Persona, Veriff
- **Language**: TypeScript

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Aleo Documentation](https://developer.aleo.org/)
- [ARC-721 Standard](https://github.com/AleoHQ/arcs)

## License

MIT

