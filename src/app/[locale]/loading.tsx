export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-4 border-volcano border-t-transparent animate-spin" />
        </div>
        <p className="text-sm text-text-secondary animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
