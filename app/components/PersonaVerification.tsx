"use client";

import { useRef, useEffect, useState } from "react";

const CONTAINER_ID = "persona-embed-container";

export type PersonaCompletePayload = {
  inquiryId: string;
  status: string;
  fields: Record<string, unknown> | Record<string, string>;
};

type PersonaVerificationProps = {
  templateId: string;
  environmentId: string;
  referenceId: string;
  onComplete: (payload: PersonaCompletePayload) => void;
  onCancel?: (payload: { inquiryId?: string; sessionToken?: string }) => void;
  onError?: (error: unknown) => void;
  onLoad?: () => void;
};

export function PersonaVerification({
  templateId,
  environmentId,
  referenceId,
  onComplete,
  onCancel,
  onError,
  onLoad,
}: PersonaVerificationProps) {
  const clientRef = useRef<{ open: () => void; destroy: () => void } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!templateId || !environmentId || !referenceId) return;

    let cancelled = false;
    setError(null);

    (async () => {
      try {
        const { Client } = await import("persona");
        let client: InstanceType<typeof Client>;
        const options = {
          templateId,
          environmentId,
          referenceId,
          containerId: CONTAINER_ID,
          onLoad: () => {
            onLoad?.();
          },
          onReady: () => {
            if (cancelled) return;
            clientRef.current = client;
            setLoading(false);
            client.open();
          },
          onComplete: ({ inquiryId, status, fields }: PersonaCompletePayload) => {
            if (cancelled) return;
            onComplete({ inquiryId, status, fields });
          },
          onCancel: (payload: { inquiryId?: string; sessionToken?: string }) => {
            if (cancelled) return;
            onCancel?.(payload);
          },
          onError: (err: unknown) => {
            if (cancelled) return;
            setError(err instanceof Error ? err.message : String(err));
            onError?.(err);
          },
        };
        // Persona SDK accepts containerId at runtime; InquiryOptions types omit it
        client = new Client(options as never);
        client.render();
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg);
          onError?.(err);
        }
      }
    })();

    return () => {
      cancelled = true;
      if (clientRef.current && "destroy" in clientRef.current) {
        try {
          (clientRef.current as { destroy: () => void }).destroy();
        } catch (_) {}
        clientRef.current = null;
      }
    };
  }, [templateId, environmentId, referenceId, onComplete, onCancel, onError, onLoad]);

  return (
    <div className="w-full">
      {loading && (
        <p className="text-black/70 text-sm mb-2">Loading Persona verification…</p>
      )}
      <div id={CONTAINER_ID} className="min-h-[400px] w-full" />
      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
