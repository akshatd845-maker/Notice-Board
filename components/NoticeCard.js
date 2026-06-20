import Link from "next/link";

export default function NoticeCard({ notice, onDeleteClick }) {
  const { id, title, body, category, priority, publishDate, image } = notice;

  const isUrgent = priority === "Urgent";
  const borderClass = isUrgent
    ? "border border-zinc-200 border-l-red-500 border-l-[4px]"
    : "border border-zinc-200";

  const badgeClass = isUrgent
    ? "inline-flex items-center rounded-full bg-red-50 border border-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-600"
    : "inline-flex items-center rounded-full bg-zinc-100 border border-zinc-200/60 px-2.5 py-0.5 text-xs font-semibold text-zinc-600";

  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : null;

  return (
    <div className={`group flex flex-col rounded-2xl bg-white p-5 shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-zinc-300 transition-all duration-300 ${borderClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-zinc-900 tracking-tight group-hover:text-black">{title}</h2>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-zinc-50 border border-zinc-200/40 px-2.5 py-0.5 text-xs font-semibold text-zinc-700">
              {category}
            </span>
            <span className={badgeClass}>{priority}</span>
            {formattedDate ? (
              <span className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                <span className="inline-block h-1 w-1 rounded-full bg-zinc-300"></span>
                {formattedDate}
              </span>
            ) : null}
          </div>
        </div>
        {image ? (
          <div className="relative h-12 w-12 flex-none overflow-hidden rounded-xl border border-zinc-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={image}
              alt="Notice image"
            />
          </div>
        ) : null}
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-600 flex-1">{body}</p>

      <div className="mt-5 flex items-center gap-3">
        <Link
          href={`/edit/${id}`}
          className="flex-1 text-center rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-zinc-800 active:scale-[0.98] shadow-xs cursor-pointer"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDeleteClick?.(notice)}
          className="flex-1 rounded-xl border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 active:scale-[0.98] cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

