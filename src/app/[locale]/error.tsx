"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-yellow-500" />
        </div>

        <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-text-primary mb-4">
          Something went wrong
        </h2>
        <p className="text-text-secondary mb-8">
          An unexpected error occurred. Please try again or go back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-volcano hover:bg-volcano-hover text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 text-text-primary hover:border-volcano hover:text-volcano px-8 py-3 font-semibold transition-all"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
