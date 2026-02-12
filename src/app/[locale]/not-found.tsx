import { Link } from "@/i18n/navigation";
import { Mountain, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-full bg-volcano/10 flex items-center justify-center mx-auto mb-6">
          <Mountain className="h-10 w-10 text-volcano" />
        </div>

        <h1 className="font-[family-name:var(--font-jakarta)] text-6xl font-bold text-text-primary mb-2">
          404
        </h1>
        <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-text-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Perhaps you were looking for one of our amazing Teide experiences?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-volcano hover:bg-volcano-hover text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 text-text-primary hover:border-volcano hover:text-volcano px-8 py-3 font-semibold transition-all"
          >
            Explore Activities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
