import prisma from "@/lib/prisma";

function jsonError(res, status, message) {
  return res.status(status).json({ error: message });
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function parsePublishDate(value) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") return { error: "Invalid publishDate" };
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return { error: "Invalid publishDate" };
  return d;
}

export default async function handler(req, res) {
  const id = Number(req.query.id);
  if (!Number.isInteger(id)) return jsonError(res, 400, "Invalid id");

  try {
    if (req.method === "GET") {
      const notice = await prisma.notice.findUnique({ where: { id } });
      if (!notice) return jsonError(res, 404, "Notice not found");
      return res.status(200).json({ notice });
    }

    if (req.method === "PUT") {
      const existing = await prisma.notice.findUnique({ where: { id } });
      if (!existing) return jsonError(res, 404, "Notice not found");

      const { title, body, category, priority, publishDate, image } = req.body ?? {};

      if (!isNonEmptyString(title)) return jsonError(res, 400, "title is required");
      if (!isNonEmptyString(body)) return jsonError(res, 400, "body is required");

      const categoryAllowed = new Set(["Exam", "Event", "General"]);
      const priorityAllowed = new Set(["Normal", "Urgent"]);

      if (category !== undefined && category !== null && !categoryAllowed.has(category)) {
        return jsonError(res, 400, "Invalid category");
      }
      if (priority !== undefined && priority !== null && !priorityAllowed.has(priority)) {
        return jsonError(res, 400, "Invalid priority");
      }

      const parsedPublishDate = parsePublishDate(publishDate);
      if (parsedPublishDate && parsedPublishDate.error) {
        return jsonError(res, 400, parsedPublishDate.error);
      }

      const updated = await prisma.notice.update({
        where: { id },
        data: {
          title: title.trim(),
          body: body.trim(),
          category: category ?? "General",
          priority: priority ?? "Normal",
          publishDate: parsedPublishDate,
          image: typeof image === "string" && image.trim().length > 0 ? image.trim() : null,
        },
      });

      return res.status(200).json({ notice: updated });
    }

    if (req.method === "DELETE") {
      const existing = await prisma.notice.findUnique({ where: { id } });
      if (!existing) return jsonError(res, 404, "Notice not found");

      await prisma.notice.delete({ where: { id } });
      return res.status(200).json({ message: "Deleted" });
    }

    return jsonError(res, 405, `Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

