import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import NoticeCard from "@/components/NoticeCard";
import DeleteModal from "@/components/DeleteModal";

export default function HomePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchNotices = useCallback(async () => {
    try {
      const res = await axios.get("/api/notices");
      setNotices(res.data.notices);
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to load notices";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotices();
  }, [fetchNotices]);

  const handleDeleteClick = (notice) => {
    setDeleteTarget(notice);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/notices/${deleteTarget.id}`);
      toast.success("Notice deleted");
      setDeleteTarget(null);
      fetchNotices();
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to delete notice";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="sticky top-0 z-40 border-b border-zinc-200/60 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <h1 className="text-lg font-bold text-zinc-900 tracking-tight">Notice Board</h1>
          </div>
          <Link
            href="/add-notice"
            className="rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 active:scale-[0.98] shadow-xs cursor-pointer"
          >
            + Add Notice
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-300">
            <div className="h-6 w-6 animate-spin rounded-full border-[2.5px] border-zinc-300 border-t-zinc-900"></div>
            <p className="mt-4 text-xs font-semibold text-zinc-400 tracking-wider uppercase">Loading notices...</p>
          </div>
        ) : notices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-zinc-200 rounded-2xl bg-white p-8">
            <div className="rounded-full bg-zinc-50 p-4 border border-zinc-100">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="mt-4 text-sm font-bold text-zinc-800">No notices yet</h3>
            <p className="mt-1.5 text-xs text-zinc-400 max-w-xs leading-relaxed">Create your first notice to publish announcements, events, or exam schedules.</p>
            <Link
              href="/add-notice"
              className="mt-6 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 active:scale-[0.98] shadow-xs cursor-pointer"
            >
              Add Notice
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </main>

      <DeleteModal
        isOpen={!!deleteTarget}
        noticeTitle={deleteTarget?.title}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
}