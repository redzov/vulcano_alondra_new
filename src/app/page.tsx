// Root page — next-intl middleware handles locale detection
// and redirects to the appropriate /{locale} automatically.
// This file exists as a fallback and should not normally be reached.

import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
