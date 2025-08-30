# Stable Coin Dashboard

![Stable Coin Dashboard](https://illustrations.popsy.co/gray/app-launch.svg)

## 🚀 Overview

Stable Coin Dashboard is a modern, full-featured web application for managing stablecoin users, business accounts, transfers, charges, tokens, transactions, and more. Built with Next.js, Clerk, HeroUI, and a robust API integration, it offers a beautiful, secure, and scalable experience for both end-users and developers.

---

## 🌟 Features

- **User Management:** Create, update, delete, and view users. Search by user ID.
- **Business Accounts:** View token balances, mint stablecoins, enable gas, and see pending transactions.
- **Transfers:** Find recipients, make single or batch transfers securely.
- **API Tokens:** Create, update, revoke, and search API tokens for integrations.
- **Charges:** Create payment requests, view, update, and delete charges for users.
- **Transactions:** View all transactions, user balances, and search for specific transactions.
- **Modern UI:** Responsive sidebar navigation, theme switching, and beautiful design.
- **Security:** Industry-leading encryption, 2FA, and privacy-first architecture.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Access to the required API endpoints and Clerk keys

### Installation

```bash
git clone https://github.com/your-org/stable-coin-dashboard.git
cd stable-coin-dashboard
npm install
```

### Environment Setup

Copy `.env.local.example` to `.env.local` and fill in your API keys and endpoints:

```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### Running the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧑‍💻 Usage Guide

1. **Sign Up / Sign In:** Register or log in using Clerk authentication.
2. **Onboarding:** Complete organization onboarding if prompted.
3. **Dashboard Navigation:** Use the sidebar to access Users, Business, Transfers, Charges, Coupons, API Tokens, and Settings.
4. **User Actions:** Create, update, or delete users. Search for users by ID.
5. **Business Actions:** View balances, mint stablecoins, enable gas, and review pending transactions.
6. **Transfers:** Make single or batch transfers. Find recipients easily.
7. **Charges & Coupons:** Manage payment requests and coupons.
8. **API Tokens:** Manage API tokens for integrations.
9. **Settings:** Configure appearance, API keys, business info, and notification preferences.

---

## 🧑‍🔬 Developer Guidelines

### Project Structure

- `app/` - Next.js app routes and pages
- `components/` - Reusable React components
- `context/` - React context providers
- `public/` - Static assets
- `styles/` - Global styles and Tailwind config

### Coding Standards

- Use TypeScript for all code.
- Follow the ESLint and Prettier rules (run `npm run lint`).
- Use HeroUI components for UI consistency.
- Keep API keys and secrets out of source control.

### Adding Features

- Create new components in `components/`.
- Use context providers for global state.
- Add new pages in `app/`.
- Document new features in this README.

### Testing

- Manual testing via the browser is recommended.
- For automated tests, integrate with your preferred testing library.

### Deployment

- Build with `npm run build`.
- Deploy to Vercel, DigitalOcean, or your preferred platform.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📚 Documentation

- [Clerk Docs](https://clerk.com/docs)
- [HeroUI Docs](https://heroui.dev/docs)
- [Next.js Docs](https://nextjs.org/docs)

---

## 🛡️ License

MIT License © 2024 Stable Coin Dashboard Team

---

## 💬 Support

For help or questions, email [support@mpotulo.com](mailto:support@mpotulo.com) or open an issue.
