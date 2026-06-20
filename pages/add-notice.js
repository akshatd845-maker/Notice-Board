import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import NoticeForm from "@/components/NoticeForm";

export default function AddNoticePage() {
  const router = useRouter();
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/notices", values);
      toast.success("Notice created");
      router.push("/");
      return res;
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to create notice";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Add Notice</h1>
            <p className="mt-1 text-sm text-zinc-600">Create a new entry for your board.</p>
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
            mode="create"
            submitLabel="Create Notice"
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