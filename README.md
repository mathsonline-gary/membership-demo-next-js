# Membership Demo Next.js

A modern, full-featured membership and collaboration platform built with Next.js 15, React 19, and a robust, scalable architecture. This project demonstrates best practices for authentication, team management, real-time chat, user settings, and more—designed for extensibility and production readiness.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest), [SWR](https://swr.vercel.app/), [Axios](https://axios-http.com/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Authentication:** Email/password, Google OAuth, email verification, 2FA
- **Testing & Linting:** ESLint, Prettier, TypeScript
- **Package Manager:** pnpm

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/membership-demo-next-js.git
   cd membership-demo-next-js
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and fill in required values (authentication, database, etc.)
4. **Run the development server:**
   ```bash
   pnpm dev
   ```
5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## ✨ Key Features

- **Authentication & Security**
  - Email/password login & registration
  - Google OAuth integration
  - Email verification flow
  - Password reset & recovery
  - Two-factor authentication (2FA)
  - Device/session management
- **User Profile & Settings**
  - View and edit profile information
  - Manage password, devices, and 2FA
- **Team Management**
  - Create, edit, and delete teams
  - Manage team members
  - Responsive team list and search
- **Real-Time Chat**
  - 1:1 and group chat support
  - Real-time messaging
  - Modern chat UI with avatars and timestamps
- **Productivity Tools**
  - Data export and upload utilities
- **Documentation & Tutorials**
  - Built-in onboarding and help pages
- **Modern UI/UX**
  - Accessible, responsive design
  - Consistent theming and component library

---

## 🗂️ Project Structure

```
src/
├── app/               # App Router pages and layouts
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Core utilities and configurations
├── providers/         # React context providers
└── types/             # TypeScript type definitions
```

---

## 🛡️ Best Practices & Conventions

- Type-safe codebase with TypeScript
- Modular, feature-based architecture
- Strict linting and formatting (ESLint, Prettier)
- Accessible and responsive UI
- Environment variable management
- Error boundaries and loading states
- Security best practices for authentication and data handling

---

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [TanStack Query Docs](https://tanstack.com/query/latest/docs/framework/react/overview)

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

---

## 📝 License

This project is licensed under the MIT License.
