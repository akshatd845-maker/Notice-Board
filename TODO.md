# TODO - Notice Board CRUD (Next.js Pages Router + Prisma + Postgres)

- [x] Update `prisma/schema.prisma` to add `Notice` model + enums.
- [x] Update `pages/_app.js` to include `react-hot-toast` Toaster.

- [x] Create UI components:
  - [x] `components/NoticeCard.js`
  - [x] `components/NoticeForm.js`
  - [x] `components/DeleteModal.js`
- [x] Create API routes:
  - [x] `pages/api/notices/index.js` (GET + POST with validation)
  - [x] `pages/api/notices/[id].js` (GET + PUT + DELETE with validation)
- [x] Create pages:
  - [x] `pages/index.js` (list + cards grid; no frontend sorting)
  - [x] `pages/add-notice.js` (create)
  - [x] `pages/edit/[id].js` (edit)
- [x] Ensure `lib/prisma.js` uses singleton pattern (already exists; verify).
- [x] Update `README.md` with local setup, one improvement, and honest AI usage.
- [x] Run `npm run build` and `npm run dev` and sanity-check CRUD flows.

