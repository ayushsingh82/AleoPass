// The 'aleopass.aleo' program.
// AleoPass - KYC Verification Soulbound NFT Program
// This program implements a soulbound ARC-721 NFT that cannot be transferred

program aleopass.aleo;

// KYC Verification Record - Soulbound NFT
// This record represents a KYC verification that is bound to an address
record KYCVerification:
    owner as address.private;
    kyc_level as u8.private; // 0: basic, 1: intermediate, 2: enhanced
    provider as u8.private;  // 0: Onfido, 1: Persona, 2: Veriff
    expiration_block as u64.private; // Block number when verification expires
    minted_at_block as u64.private;  // Block number when NFT was minted

// Transition function to mint a new KYC verification NFT
// Only the program deployer can call this function
// Note: Deployer-only access should be enforced at the application level
transition mint_kyc(
    receiver: address,
    kyc_level: u8,
    provider: u8,
    expiration_block: u64,
    minted_at_block: u64,
) -> KYCVerification {
    // Create the KYC verification record
    // Note: In production, add access control to ensure only deployer can mint
    return KYCVerification {
        owner: receiver,
        kyc_level: kyc_level,
        provider: provider,
        expiration_block: expiration_block,
        minted_at_block: minted_at_block,
    };
}

// Function to check if a KYC verification is still valid
// This checks if the current block is less than the expiration block
transition check_verification(
    verification: KYCVerification,
    current_block: u64,
) -> bool {
    // Check if verification has expired
    // Returns true if current_block < expiration_block
    lt current_block verification.expiration_block into is_valid;
    return is_valid;
}

// Function to get KYC verification details
// Returns verification metadata
transition get_verification_details(
    verification: KYCVerification,
) -> (address, u8, u8, u64, u64) {
    return (
        verification.owner,
        verification.kyc_level,
        verification.provider,
        verification.expiration_block,
        verification.minted_at_block,
    );
}

// Note: Transfer function is intentionally omitted
// This is a soulbound NFT - it cannot be transferred
// The only way to "transfer" would be to share private keys, which defeats the purpose
// Records in Aleo are owned by the address that created them, and ownership is enforced
// at the blockchain level, so transfers are not possible without explicit transfer logic
