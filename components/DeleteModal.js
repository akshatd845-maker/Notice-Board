import { useEffect } from "react";

export default function DeleteModal({ isOpen, noticeTitle, onCancel, onConfirm, isLoading }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Delete notice?</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              This action cannot be undone. {noticeTitle ? <span className="font-semibold text-zinc-800">“{noticeTitle}”</span> : null}
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-zinc-200 px-2 py-0.5 text-sm font-semibold text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.98] cursor-pointer"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 active:scale-[0.98] cursor-pointer"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

