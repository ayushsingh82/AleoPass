import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/verify?wallet=aleo_address
 * Returns KYC verification status for the given Aleo wallet address.
 * Response shape matches the public API for dApps to check verified status.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet")?.trim();

    if (!wallet) {
      return NextResponse.json(
        { error: "Missing wallet query parameter. Use: /api/verify?wallet=aleo_address" },
        { status: 400 }
      );
    }

    // Basic Aleo address format check (aleo1... or aleo12... etc.)
    if (!/^aleo1[a-z0-9]{58}$/i.test(wallet)) {
      return NextResponse.json(
        { error: "Invalid wallet address format" },
        { status: 400 }
      );
    }

    // TODO: Integrate with deployed nftkyc program - query mapping or view function
    // to get verified status, expiration block, and ownerId for this address.
    // For now return stub response.
    const verified = false;
    const expirationBlock = 0;
    const ownerId = "";

    return NextResponse.json({
      verified,
      expirationBlock,
      ownerId: ownerId || wallet,
    });
  } catch (err) {
    console.error("[api/verify] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
