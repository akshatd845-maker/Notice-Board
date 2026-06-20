import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import NoticeForm from "@/components/NoticeForm";

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchNotice = async () => {
      try {
        const res = await axios.get(`/api/notices/${id}`);
        setNotice(res.data.notice);
      } catch (err) {
        const msg = err?.response?.data?.error || "Failed to load notice";
        toast.error(msg);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id, router]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const res = await axios.put(`/api/notices/${id}`, values);
      toast.success("Notice updated");
      router.push("/");
      return res;
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to update notice";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-sm font-semibold text-zinc-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Edit Notice</h1>
            <p className="mt-1 text-sm text-zinc-600">Update an existing entry.</p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.98] cursor-pointer"
          >
            Back
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
          <NoticeForm
            key={notice.id}
            initialValues={notice}
            mode="update"
            submitLabel="Update Notice"
            apiError={apiError}
            setApiError={setApiError}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}