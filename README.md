# Stable Coin Dashboard

A modern dashboard for managing users, business accounts, transfers, charges, API tokens, and transactions using Next.js 14, HeroUI v2, and TypeScript.

## Features

- **User Management:** Create, update, delete, and view users. Search by user ID.
- **Business Management:** View token balances, mint stablecoins, enable gas for business and users, and see pending transactions.
- **Transfers:** Find recipients, make single or batch transfers.
- **Charges:** Create payment requests, view, update, and delete charges for users.
- **API Tokens:** Create, update, revoke, and search API tokens.
- **Transactions:** View all transactions, user balances, and search for specific transactions.
- **Responsive UI:** Sidebar navigation, theme switching, and modern design.

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/stable-coin-dashboard.git
cd stable-coin-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and set your API base and token:

```bash
NEXT_PUBLIC_API_BASE=https://your-api-base-url/api/v1
NEXT_PUBLIC_API_TOKEN=Bearer your-api-token
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
npm start
```

## Application Structure

- `/app` - Next.js app directory (pages, layouts, views)
- `/components` - Reusable UI components (users, business, transfers, charges, tokens, transactions)
- `/context` - React context providers (sidebar, stable coin data)
- `/hooks` - Custom React hooks for API integration
- `/types` - TypeScript interfaces for API data
- `/config` - Site configuration
- `/styles` - Global styles

## API Integration

All data is fetched from the backend API using Axios. See `/hooks` for usage patterns.

## Customization

- Update sidebar navigation in `/components/sidebar-navigation.tsx`
- Change site config in `/config/site.ts`
- Add new features by extending hooks and components.

## License

Licensed under the [MIT license](LICENSE).

---

**For more details, see the inline code comments and each component's documentation.**
