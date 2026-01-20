# AleoPass Leo Program

This is the Leo program for AleoPass - a KYC Verification Protocol that mints soulbound NFTs to verified Aleo wallets.

## Program Overview

The `nftkyc_v12.aleo` program implements a soulbound ARC-721 NFT system where:

- **Soulbound NFTs**: KYC verification records are bound to a specific address and cannot be transferred
- **Deployer-only Minting**: Only the program deployer can mint new KYC verification NFTs
- **Expiration**: Each verification has an expiration block timestamp (6 months from mint)
- **KYC Metadata**: Stores KYC level and provider information

## Program Structure

### Record: `KYCVerification`

The core data structure representing a KYC verification:

```leo
record KYCVerification:
    owner as address.private;
    kyc_level as u8.private; // 0: basic, 1: intermediate, 2: enhanced
    provider as u8.private;  // 0: Onfido, 1: Persona, 2: Veriff
    expiration_block as u64.private;
    minted_at_block as u64.private;
```

### Functions

1. **`mint_kyc`**: Mints a new KYC verification NFT to a specified address
   - Only the deployer can call this function
   - Creates a new `KYCVerification` record

2. **`check_verification`**: Checks if a KYC verification is still valid
   - Compares current block with expiration block
   - Returns `true` if verification is still valid

3. **`get_verification_details`**: Retrieves verification details
   - Only the owner can access their verification details
   - Returns all verification metadata

## Building the Program

Make sure you have [Leo installed](https://developer.aleo.org/leo/installation).

### Build the program:

```bash
leo build
```

### Run tests (if you add test files):

```bash
leo test
```

### Deploy the program:

```bash
leo deploy --broadcast --yes
```

## Deployment

The program `nftkyc_v13.aleo` has been deployed to Aleo Testnet.

**Contract/Program Address:** `nftkyc_v13.aleo`

**Deployment Transaction:** [View on Explorer](https://testnet.explorer.provable.com/transaction/at1pr48c4ay5yj8lhjpea0sdh7p0cfv0y5fs9730kztupzzdltuxsyqt6l9nn)

**Program Page:** [View Program](https://testnet.explorer.provable.com/program/nftkyc_v13.aleo)

**Network:** Testnet  
**Status:** ✅ Deployed and Confirmed  
**Transaction ID:** `at1pr48c4ay5yj8lhjpea0sdh7p0cfv0y5fs9730kztupzzdltuxsyqt6l9nn`

**Important Addresses:**
- **Contract Address (Program ID):** `nftkyc_v13.aleo` - This is the deployed program address on the blockchain
- **Authorized Minter Address:** `aleo12v4hjyh4gmrlc57amxfeepfvmvdwmaskqczexfw2ctfa3hql7g9sukj33u` - This address has permission to call the `mint` function. This is hardcoded as a constant in the program and cannot be changed without redeploying the entire program.

**Program Features:**
- ARC721 compliant KYC NFT system
- Soulbound NFTs (non-transferable)
- 6-month expiry period
- KYC levels: 1 (Basic), 2 (Intermediate), 3 (Enhanced)

## Usage

### Minting a KYC Verification

After deploying the program, you can mint a KYC verification NFT using the `mint_kyc` function:

```bash
leo run mint_kyc \
  <receiver_address> \
  <kyc_level: 0|1|2> \
  <provider: 0|1|2> \
  <expiration_block> \
  <minted_at_block>
```

### Checking Verification Status

To check if a verification is still valid:

```bash
leo run check_verification \
  <verification_record> \
  <current_block>
```

## KYC Levels

- `0`: Basic verification
- `1`: Intermediate verification
- `2`: Enhanced verification

## KYC Providers

- `0`: Onfido
- `1`: Persona
- `2`: Veriff

## Security Considerations

1. **Soulbound Property**: This NFT cannot be transferred. To transfer ownership, one would need to share private keys, which defeats the security purpose.

2. **Deployer-only Minting**: Only the program deployer address can mint new verifications. This prevents unauthorized minting.

3. **Expiration**: Verifications expire after 6 months (based on block numbers), forcing periodic re-verification.

4. **Privacy**: All record data is private by default in Aleo.

## Development

This program is designed to work with the AleoPass frontend application, which handles:
- Wallet connection
- KYC provider integration
- Transaction submission
- Verification API

## License

MIT
