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
  try {
    if (req.method === "GET") {
      // No frontend sorting: ordering is fully handled by Prisma.
      // Requirement: Urgent first, then Normal by publishDate desc.

      // Fetch urgent ordered by createdAt/publishDate for determinism.
      const urgent = await prisma.notice.findMany({
        where: { priority: "Urgent" },
        orderBy: [
          // Urgent should also respect publishDate desc (when available)
          { publishDate: "desc" },
          { createdAt: "desc" },
        ],
      });

      const normal = await prisma.notice.findMany({
        where: { priority: "Normal" },
        orderBy: [
          { publishDate: "desc" },
          { createdAt: "desc" },
        ],
      });

      return res.status(200).json({ notices: [...urgent, ...normal] });
    }

    if (req.method === "POST") {
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

      const created = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category: category ?? "General",
          priority: priority ?? "Normal",
          publishDate: parsedPublishDate,
          image: typeof image === "string" && image.trim().length > 0 ? image.trim() : null,
        },
      });

      return res.status(201).json({ notice: created });
    }

    return jsonError(res, 405, `Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return jsonError(res, 500, "Internal server error");
  }
}

