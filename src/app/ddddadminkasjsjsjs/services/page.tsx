"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AdminService {
  slug: string;
  titleKey: string;
  price: number;
  images: string[];
  category: string;
  duration: string;
  difficulty: string;
  rating: number;
  reviewCount: number;
  hasOverride: boolean;
}

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.status === 401) { router.replace("/ddddadminkasjsjsjs"); return; }
      const data = await res.json();
      setServices(data);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [router]);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/ddddadminkasjsjsjs");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: "1px solid #eee", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/ddddadminkasjsjsjs/services" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#E74D0F", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>TE</div>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Admin</span>
            </Link>
            <span style={{ padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#E74D0F", background: "#FEF2EE" }}>Services</span>
          </div>
          <button onClick={handleLogout} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #ddd", background: "white", fontSize: 13, cursor: "pointer", color: "#666" }}>Logout</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", marginBottom: 24 }}>Services ({services.length})</h1>

        {loading ? (
          <p style={{ textAlign: "center", color: "#999", padding: 40 }}>Loading...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {services.map((s) => (
              <div key={s.slug} style={{ background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                <div style={{ position: "relative", paddingTop: "56%", background: "#f0f0f0" }}>
                  {s.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.images[0]} alt={formatSlug(s.slug)} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{formatSlug(s.slug)}</h3>
                    <span style={{ fontSize: 18, fontWeight: 700, color: "#E74D0F" }}>{"\u20AC"}{s.price.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 12, color: "#888" }}>
                    <span>{s.duration}</span>
                    <span>{s.difficulty}</span>
                    <span>{s.rating.toFixed(1)} ({s.reviewCount})</span>
                  </div>
                  <Link href={`/ddddadminkasjsjsjs/services/${s.slug}`} style={{
                    display: "block", textAlign: "center", padding: "8px 0", borderRadius: 8,
                    background: "#E74D0F", color: "white", fontSize: 13, fontWeight: 600, textDecoration: "none",
                  }}>Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatSlug(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
