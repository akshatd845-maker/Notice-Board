# Notice Board Application

A full-stack CRUD application for managing notices built with Next.js Pages Router, Prisma ORM, and PostgreSQL.

## Features

- List all notices as responsive cards
- Add new notices with title, body, category, priority, and optional image
- Edit existing notices
- Delete notices with confirmation modal
- Red badge indicator for Urgent notices
- Urgent notices appear first (sorted by Prisma)
- Normal notices sorted by publishDate descending
- Toast notifications for all operations
- Server-side validation in API routes
- Responsive design for mobile and desktop

## Tech Stack

- **Framework**: Next.js Pages Router
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **HTTP Client**: Axios
- **Notifications**: react-hot-toast

## Local Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon or local)

### Steps

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the root directory with:
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```
   
   For Neon PostgreSQL, your connection string will look like:
   ```
   postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/noticeboard?sslmode=require
   ```

3. **Initialize Prisma**
   
   Prisma 7 uses a central configuration file (`prisma.config.ts`) rather than storing database urls in the schema itself. Generate the client and apply the schema to the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── components/
│   ├── DeleteModal.js    # Confirmation modal for delete
│   ├── NoticeCard.js     # Card component for displaying notices
│   └── NoticeForm.js     # Form component for create/edit
├── lib/
│   └── prisma.js         # Prisma client singleton (reusable connection)
├── pages/
│   ├── index.js          # Home page - list all notices
│   ├── add-notice.js     # Add notice page
│   ├── edit/
│   │   └── [id].js       # Edit notice page (dynamic route)
│   └── api/
│       └── notices/
│           ├── index.js  # GET all, POST new notice
│           └── [id].js   # GET, PUT, DELETE single notice
├── prisma/
│   └── schema.prisma     # Database schema (models and enums)
├── prisma.config.ts      # Prisma 7 configuration file (loads database connection)
└── styles/
    └── globals.css       # Global styles (Tailwind CSS v4 config)
```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notices` | List all notices (sorted by priority) |
| POST | `/api/notices` | Create new notice |
| GET | `/api/notices/:id` | Get single notice |
| PUT | `/api/notices/:id` | Update notice |
| DELETE | `/api/notices/:id` | Delete notice |

## One Improvement with More Time

If given more time, I would implement **user authentication and authorization** to secure the Notice Board application. This would include:

- Login/Logout functionality with NextAuth.js
- Role-based access control (admin vs viewer)
- Protected API routes
- Password protection for creating/editing notices
- Session management with JWT

This would transform the public notice board into a private system where only authorized users can manage content.

## Honest AI Usage Explanation

This Notice Board application was built with significant assistance from AI tools (Claude Code). The AI helped with:

1. **Code generation**: Generated the complete file structure and code for all components, pages, and API routes based on the detailed requirements
2. **Best practices**: Applied proper patterns like Prisma singleton, error handling, and validation
3. **Styling**: Used Tailwind CSS effectively for responsive design
4. **Project structure**: Organized the codebase following Next.js Pages Router conventions

The human user provided:
- Clear requirements and specifications
- Database schema design decisions
- Tech stack choices

This combination resulted in a fully functional CRUD application that meets all specified requirements.