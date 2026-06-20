import { useEffect, useMemo, useState } from "react";

export default function NoticeForm({
  initialValues,
  mode,
  onSubmit,
  submitLabel,
  apiError,
  setApiError,
  isSubmitting,
}) {
  const categoryAllowed = useMemo(() => ["Exam", "Event", "General"], []);
  const priorityAllowed = useMemo(() => ["Normal", "Urgent"], []);

  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [body, setBody] = useState(initialValues?.body ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "General");
  const [priority, setPriority] = useState(initialValues?.priority ?? "Normal");
  const [publishDate, setPublishDate] = useState(() => {
    const v = initialValues?.publishDate;
    if (!v) return "";
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return "";
    // datetime-local expects YYYY-MM-DDTHH:mm
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
      d.getMinutes()
    )}`;
  });
  const [image, setImage] = useState(initialValues?.image ?? "");

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setApiError?.(null);
        await onSubmit?.({
          title,
          body,
          category,
          priority,
          publishDate,
          image,
        });
      }}
    >
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="e.g., Math Exam Details"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter all notice details here..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black appearance-none cursor-pointer"
          >
            {categoryAllowed.map((c) => (
              <option key={c} value={c} className="text-black bg-white">
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black appearance-none cursor-pointer"
          >
            {priorityAllowed.map((p) => (
              <option key={p} value={p} className="text-black bg-white">
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Publish date</label>
          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          />
          <p className="mt-1.5 text-xs text-zinc-400">Leave empty if unknown.</p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Image URL (optional)</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="https://images.unsplash.com/..."
          />
        </div>
      </div>

      {apiError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 animate-in fade-in duration-250">
          {apiError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-zinc-900 px-4 py-3.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60 active:scale-[0.99] shadow-sm cursor-pointer"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>

      {mode ? (
        <div className="text-xs text-zinc-400 text-center">
          {mode === "create" ? "Creating a new notice entry." : "Updating the current notice entry."}
        </div>
      ) : null}
    </form>
  );
}

