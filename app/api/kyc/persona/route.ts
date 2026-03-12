import { NextResponse } from "next/server";

/**
 * POST /api/kyc/persona
 * Receives Persona inquiry result (inquiryId, status, address).
 * Optionally verify the inquiry with Persona API and trigger KYC NFT mint.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inquiryId, status, address } = body as {
      inquiryId?: string;
      status?: string;
      address?: string;
    };

    if (!inquiryId || !address) {
      return NextResponse.json(
        { error: "Missing inquiryId or address" },
        { status: 400 }
      );
    }

    // TODO: Verify inquiry with Persona API (PERSONA_API_KEY) and check status === 'approved'
    // TODO: Call Aleo program mint transition for this address (provider = 1 for Persona, kyc_level as needed)
    // For now we only record that the client completed the flow
    return NextResponse.json({
      ok: true,
      inquiryId,
      status,
      address,
      message: "KYC result received. NFT mint can be triggered after server-side verification.",
    });
  } catch (e) {
    console.error("Persona KYC API error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
