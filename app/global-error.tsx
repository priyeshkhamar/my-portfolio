"use client";

/**
 * Root error boundary — catches errors in the root layout itself, so it must
 * render its own <html>/<body> and use no app CSS.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#060607",
          color: "#f2f2f0",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>
          Something went wrong.
        </h1>
        <p style={{ color: "#9d9da5", margin: 0 }}>
          The page hit an unexpected error.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: 8,
            padding: "12px 24px",
            borderRadius: 999,
            border: "none",
            background: "#c8f751",
            color: "#060607",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
