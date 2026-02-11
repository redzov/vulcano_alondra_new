"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface ServiceDetail {
  slug: string;
  price: number;
  images: string[];
  category: string;
  title: string;
  shortDescription: string;
  description: string;
  fullDescription: string;
  duration: string;
  difficulty: string;
  rating: number;
  reviewCount: number;
  languages: string[];
  highlights: string[];
  includes: string[];
  notIncluded: string[];
  restrictions: string[];
  importantInfo: string[];
  prepare: string[];
  meetingPoint: string;
}

const ALL_LANGUAGES = ["DE", "EN", "ES", "FR", "IT", "NL", "PL", "RU"];
const DIFFICULTIES = ["Low", "Medium", "High"];

export default function AdminEditServicePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [service, setService] = useState<ServiceDetail | null>(null);
  const [form, setForm] = useState<ServiceDetail | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchService = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/services/${slug}`);
      if (res.status === 401) { router.replace("/ddddadminkasjsjsjs"); return; }
      if (res.status === 404) { router.replace("/ddddadminkasjsjsjs/services"); return; }
      const data = await res.json();
      setService(data);
      setForm(data);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [slug, router]);

  useEffect(() => { fetchService(); }, [fetchService]);

  const update = (field: keyof ServiceDetail, value: unknown) => {
    setForm((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/services/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } catch { /* ignore */ } finally { setSaving(false); }
  };

  // Array field helpers
  const addItem = (field: keyof ServiceDetail) => {
    const arr = (form?.[field] as string[]) || [];
    update(field, [...arr, ""]);
  };
  const removeItem = (field: keyof ServiceDetail, i: number) => {
    const arr = (form?.[field] as string[]) || [];
    update(field, arr.filter((_, idx) => idx !== i));
  };
  const updateItem = (field: keyof ServiceDetail, i: number, val: string) => {
    const arr = [...((form?.[field] as string[]) || [])];
    arr[i] = val;
    update(field, arr);
  };

  // Image helpers
  const addImage = () => { if (newImageUrl.trim()) { update("images", [...(form?.images || []), newImageUrl.trim()]); setNewImageUrl(""); } };
  const removeImage = (i: number) => { update("images", (form?.images || []).filter((_, idx) => idx !== i)); };
  const moveImage = (i: number, dir: -1 | 1) => {
    const imgs = [...(form?.images || [])];
    const ni = i + dir;
    if (ni < 0 || ni >= imgs.length) return;
    [imgs[i], imgs[ni]] = [imgs[ni], imgs[i]];
    update("images", imgs);
  };

  // Language toggle
  const toggleLang = (lang: string) => {
    const langs = form?.languages || [];
    if (langs.includes(lang)) {
      update("languages", langs.filter((l) => l !== lang));
    } else {
      update("languages", [...langs, lang]);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/ddddadminkasjsjsjs");
  };

  if (loading || !form) {
    return <Shell onLogout={handleLogout}><p style={{ textAlign: "center", padding: 60, color: "#999" }}>Loading...</p></Shell>;
  }

  return (
    <Shell onLogout={handleLogout}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Link href="/ddddadminkasjsjsjs/services" style={{ fontSize: 13, color: "#E74D0F", textDecoration: "none" }}>
          &larr; Back to Services
        </Link>

        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", margin: "16px 0 4px" }}>
          {form.title || formatSlug(slug)}
        </h1>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>{form.category}</p>

        {/* Title & Short Description */}
        <Section title="Basic Information">
          <Field label="Title">
            <input value={form.title} onChange={(e) => update("title", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Short Description">
            <textarea value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Field label="Price (&euro;)">
              <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => update("price", parseFloat(e.target.value) || 0)} style={inputStyle} />
            </Field>
            <Field label="Duration">
              <input value={form.duration} onChange={(e) => update("duration", e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Difficulty">
              <select value={form.difficulty} onChange={(e) => update("difficulty", e.target.value)} style={inputStyle}>
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Rating">
              <input type="number" step="0.01" min="0" max="5" value={form.rating} onChange={(e) => update("rating", parseFloat(e.target.value) || 0)} style={inputStyle} />
            </Field>
            <Field label="Review Count">
              <input type="number" min="0" value={form.reviewCount} onChange={(e) => update("reviewCount", parseInt(e.target.value) || 0)} style={inputStyle} />
            </Field>
          </div>
        </Section>

        {/* Languages */}
        <Section title="Languages">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ALL_LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLang(lang)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1px solid",
                  borderColor: form.languages.includes(lang) ? "#E74D0F" : "#ddd",
                  background: form.languages.includes(lang) ? "#FEF2EE" : "white",
                  color: form.languages.includes(lang) ? "#E74D0F" : "#666",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </Section>

        {/* Full Description */}
        <Section title="Full Description">
          <textarea value={form.fullDescription} onChange={(e) => update("fullDescription", e.target.value)} rows={8} style={{ ...inputStyle, resize: "vertical" }} />
        </Section>

        {/* Images */}
        <Section title={`Images (${form.images.length})`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {form.images.map((url, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "#f9f9f9", border: "1px solid #eee" }}>
                <div style={{ width: 48, height: 32, borderRadius: 4, overflow: "hidden", flexShrink: 0, background: "#eee" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <span style={{ flex: 1, fontSize: 11, color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{url}</span>
                <button onClick={() => moveImage(i, -1)} disabled={i === 0} style={iconBtn}>{"\u2191"}</button>
                <button onClick={() => moveImage(i, 1)} disabled={i === form.images.length - 1} style={iconBtn}>{"\u2193"}</button>
                <button onClick={() => removeImage(i)} style={{ ...iconBtn, color: "#ef4444" }}>{"\u00D7"}</button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input type="url" placeholder="https://... image URL" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addImage()} style={{ ...inputStyle, flex: 1 }} />
            <button onClick={addImage} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#E74D0F", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Add</button>
          </div>
        </Section>

        {/* Highlights */}
        <ListSection title="Highlights" field="highlights" items={form.highlights} onAdd={addItem} onRemove={removeItem} onUpdate={updateItem} />

        {/* Includes */}
        <ListSection title="What's Included" field="includes" items={form.includes} onAdd={addItem} onRemove={removeItem} onUpdate={updateItem} />

        {/* Not Included */}
        <ListSection title="Not Included" field="notIncluded" items={form.notIncluded} onAdd={addItem} onRemove={removeItem} onUpdate={updateItem} />

        {/* Restrictions */}
        <ListSection title="Restrictions" field="restrictions" items={form.restrictions} onAdd={addItem} onRemove={removeItem} onUpdate={updateItem} />

        {/* Important Info */}
        <ListSection title="Important Info" field="importantInfo" items={form.importantInfo} onAdd={addItem} onRemove={removeItem} onUpdate={updateItem} />

        {/* What to Bring */}
        <ListSection title="What to Bring / Prepare" field="prepare" items={form.prepare} onAdd={addItem} onRemove={removeItem} onUpdate={updateItem} />

        {/* Meeting Point */}
        <Section title="Meeting Point">
          <textarea value={form.meetingPoint} onChange={(e) => update("meetingPoint", e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </Section>

        {/* Save */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "24px 0 40px" }}>
          <button onClick={handleSave} disabled={saving} style={{
            padding: "12px 32px", borderRadius: 10, border: "none", background: "#E74D0F", color: "white", fontSize: 15, fontWeight: 600,
            cursor: saving ? "default" : "pointer", opacity: saving ? 0.7 : 1,
          }}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {saved && <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>Saved!</span>}
        </div>
      </div>
    </Shell>
  );
}

// ── Shared Components ──

function Shell({ children, onLogout }: { children: React.ReactNode; onLogout: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ background: "white", borderBottom: "1px solid #eee", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/ddddadminkasjsjsjs/services" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#E74D0F", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>TE</div>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Admin</span>
            </Link>
            <Link href="/ddddadminkasjsjsjs/services" style={{ padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#E74D0F", textDecoration: "none", background: "#FEF2EE" }}>Services</Link>
          </div>
          <button onClick={onLogout} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #ddd", background: "white", fontSize: 13, cursor: "pointer", color: "#666" }}>Logout</button>
        </div>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <h2 style={{ fontSize: 14, fontWeight: 700, color: "#333", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 4 }}>{label}</label>
      {children}
    </div>
  );
}

function ListSection({ title, field, items, onAdd, onRemove, onUpdate }: {
  title: string;
  field: string;
  items: string[];
  onAdd: (f: keyof ServiceDetail) => void;
  onRemove: (f: keyof ServiceDetail, i: number) => void;
  onUpdate: (f: keyof ServiceDetail, i: number, val: string) => void;
}) {
  const f = field as keyof ServiceDetail;
  return (
    <Section title={`${title} (${items.length})`}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#bbb", width: 20, textAlign: "center", flexShrink: 0 }}>{i + 1}</span>
            <input value={item} onChange={(e) => onUpdate(f, i, e.target.value)} style={{ ...inputStyle, flex: 1 }} />
            <button onClick={() => onRemove(f, i)} style={{ ...iconBtn, color: "#ef4444" }}>{"\u00D7"}</button>
          </div>
        ))}
      </div>
      <button onClick={() => onAdd(f)} style={{ marginTop: 8, padding: "6px 14px", borderRadius: 8, border: "1px dashed #ccc", background: "transparent", fontSize: 13, color: "#888", cursor: "pointer" }}>
        + Add item
      </button>
    </Section>
  );
}

function formatSlug(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, outline: "none", boxSizing: "border-box" };
const iconBtn: React.CSSProperties = { width: 28, height: 28, borderRadius: 6, border: "1px solid #ddd", background: "white", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" };
