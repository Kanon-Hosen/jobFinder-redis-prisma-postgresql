# 🚀 jobFinder-redis-prisma-postgresql

<div align="center">

![Logo](path-to-logo) <!-- TODO: Add project logo -->

[![GitHub stars](https://img.shields.io/github/stars/Kanon-Hosen/jobFinder-redis-prisma-postgresql?style=for-the-badge)](https://github.com/Kanon-Hosen/jobFinder-redis-prisma-postgresql/stargazers)

[![GitHub forks](https://img.shields.io/github/forks/Kanon-Hosen/jobFinder-redis-prisma-postgresql?style=for-the-badge)](https://github.com/Kanon-Hosen/jobFinder-redis-prisma-postgresql/network)

[![GitHub issues](https://img.shields.io/github/issues/Kanon-Hosen/jobFinder-redis-prisma-postgresql?style=for-the-badge)](https://github.com/Kanon-Hosen/jobFinder-redis-prisma-postgresql/issues)

[![GitHub license](https://img.shields.io/github/license/Kanon-Hosen/jobFinder-redis-prisma-postgresql?style=for-the-badge)](LICENSE)

**A Next.js job board application leveraging Prisma, PostgreSQL, and Redis for enhanced performance and scalability.**

[Live Demo](https://job-finder-redis-prisma-postgresql.vercel.app) 

</div>

## 📖 Overview

This project is a job board web application built using Next.js, a React framework for building server-rendered and statically generated websites.  It utilizes Prisma as an ORM for interacting with a PostgreSQL database, and Redis for caching frequently accessed data, improving application speed and responsiveness. The application is deployed on Vercel.  The target audience is job seekers and recruiters.  The key problem solved is providing a fast and efficient platform for finding and posting jobs.

## ✨ Features

- **Job Search:** Search for jobs based on keywords, location, and other criteria.
- **Job Posting:** Recruiters can easily post new job openings.
- **User Accounts:** Users can create accounts to save searches and manage job applications.
- **Responsive Design:**  The application is fully responsive and works seamlessly across all devices.
- **Data Caching (Redis):** Improves performance by caching frequently accessed data.


## 🛠️ Tech Stack

**Frontend:**
- [![Next.js](https://img.shields.io/badge/Next.js-Black?logo=next.js&logoColor=white)](https://nextjs.org/)
- [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

**Backend:**
- Next.js API Routes

**Database:**
- [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
- [![Prisma](https://img.shields.io/badge/Prisma-3579FF?logo=prisma&logoColor=white)](https://www.prisma.io/)

**Caching:**
- [![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)](https://redis.io/)


## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- PostgreSQL (ensure it's running and configured)
- Redis (ensure it's running and configured)
- A Vercel account (for deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kanon-Hosen/jobFinder-redis-prisma-postgresql.git
   cd jobFinder-redis-prisma-postgresql
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:** Create a `.env.local` file (**don't commit this file**)  with the following environment variables:  Replace placeholders with your actual values.

   ```
   DATABASE_URL="postgresql://your_db_user:your_db_password@your_db_host:your_db_port/your_db_name"
   REDIS_URL="redis://your_redis_host:your_redis_port"
   ```

4. **Database Migrations:**
   ```bash
   npx prisma db push
   ```

5. **Start development server:**
   ```bash
   pnpm dev
   ```

6. **Open your browser:**
   Visit `http://localhost:3000`


## 📁 Project Structure

```
jobFinder-redis-prisma-postgresql/
├── app/
│   ├── api/
│   │   └── [...API routes]
│   ├── components/
│   │   └── [...UI Components]
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── [...Reusable components]
├── hooks/
│   └── [...custom hooks]
├── lib/
│   └── [...utility functions]
├── middleware.js
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
└── ...
```

## ⚙️ Configuration

### Environment Variables

| Variable        | Description                                   | Default       | Required |

|-----------------|-----------------------------------------------|----------------|----------|

| `DATABASE_URL`  | PostgreSQL connection string                   |                | Yes      |

| `REDIS_URL`     | Redis connection string                        |                | Yes      |


### Configuration Files
- `next.config.mjs`: Next.js configuration.
- `prisma/schema.prisma`: Prisma schema defining the database models.


## 🧪 Testing

<!-- TODO: Add information about testing if tests are present -->


## 🚀 Deployment

The application is deployed to Vercel.  To deploy your own changes, you will need to connect this repository to your Vercel account.

## 🤝 Contributing

<!-- TODO: Add contributing guidelines -->


## 📄 License

MIT

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

</div>

