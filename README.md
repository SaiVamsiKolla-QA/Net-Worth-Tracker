# 🧠 Net Worth Tracker

A modern, modular web application for tracking Canadian assets and liabilities with real-time net worth visualization and future projections.

[![CI Pipeline](https://github.com/yourusername/networth-tracker/workflows/CI%20Pipeline/badge.svg)](https://github.com/yourusername/networth-tracker/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📖 Overview

Net Worth Tracker is a production-ready financial management application built with **OOP principles**, **SOLID design patterns**, and modern web technologies. It allows users to:

- Track diverse asset types (investments, crypto, precious metals)
- Manage liabilities with loan amortization and recurring expenses
- Visualize net worth over time with interactive charts
- Project future net worth with recurring expenses
- Export/import data for backup and portability

**Built for the open-source community** with emphasis on clean architecture, testability, and maintainability.

---

## ⚙️ Features

### 💰 Asset Management
- **Investment Accounts**: TFSA, RRSP (Registered & Managed)
- **Cryptocurrency**: Multi-coin support (BTC, ETH, CRO) with quantity tracking
- **Precious Metals**: Gold/Silver tracking by weight (grams/ounces) and price
- **Liquid Assets**: Cash and High-Interest Savings Accounts

### 📉 Liability Management
- **Loans**: Car, Home, Line of Credit with principal/interest separation
- **Recurring Expenses**: Insurance premiums (Car, Home, Health, Life)
- **Other Bills**: Property taxes, security bills, credit cards
- **Future Projections**: Monthly expense forecasting

### 📊 Visualization & Analytics
- **Net Worth Timeline**: Interactive Chart.js graphs
- **Asset Allocation**: Pie charts showing portfolio distribution
- **Snapshots**: Historical net worth tracking
- **Projections**: 12-month forward-looking analysis

### 🎨 User Experience
- **Dark Mode Support**: Toggle between light/dark themes
- **Multi-Page Navigation**: Separate views for Dashboard, Assets, and Liabilities
- **Responsive Design**: Mobile-first approach
- **Data Persistence**: LocalStorage with JSON export/import

---

## 🧩 Architecture

### Design Patterns

1. **Repository Pattern**: Abstracted data persistence layer
2. **Strategy Pattern**: Different calculation methods for asset types
3. **Factory Pattern**: Asset/Liability creation from JSON
4. **Observer Pattern**: React Context for state management
5. **Dependency Injection**: Service layer separation

### SOLID Principles

- **Single Responsibility**: Each class has one clear purpose
- **Open/Closed**: Extensible without modifying existing code
- **Liskov Substitution**: Interfaces ensure contract compliance
- **Interface Segregation**: Focused, minimal interfaces
- **Dependency Inversion**: High-level modules depend on abstractions

### Folder Structure

```
src/
├── models/              # Domain entities (Asset, Liability, Portfolio)
├── services/            # Business logic (Calculator, Projection, NetWorth)
├── repositories/        # Data persistence abstraction
├── components/          # React UI components
│   ├── dashboard/
│   ├── assets/
│   ├── liabilities/
│   └── common/
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
└── utils/               # Helper functions
```

---

## 🛠️ Setup

### Prerequisites

- **Node.js**: v18.x or v20.x
- **npm**: v9.x or higher
- **Git**: For cloning the repository

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/networth-tracker.git
cd networth-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## ▶️ Run Instructions

### Development Mode

```bash
npm run dev
```

Starts Vite dev server with Hot Module Replacement (HMR).

### Production Build

```bash
npm run build
```

Creates optimized production bundle in `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

---

## 🧪 Testing Guide

### Run All Tests

```bash
npm test
```

### Watch Mode (for TDD)

```bash
npm run test:watch
```

### Coverage Report

```bash
npm run test:coverage
```

Generates coverage report in `coverage/` folder. Target: **70% coverage** for all metrics.

### Test Structure

```
tests/
├── unit/
│   ├── models/          # Asset, Liability, Portfolio tests
│   ├── services/        # Business logic tests
│   └── utils/           # Helper function tests
└── integration/         # End-to-end workflow tests
```

### Sample Test Output

```
PASS  tests/unit/models/Asset.test.ts
PASS  tests/unit/services/CalculatorService.test.ts
PASS  tests/integration/Portfolio.integration.test.ts

Test Suites: 15 passed, 15 total
Tests:       87 passed, 87 total
Coverage:    Branches: 78%, Functions: 82%, Lines: 85%
```

---

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

Located at `.github/workflows/ci.yml`, the pipeline runs on:
- **Push** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop`

### Pipeline Steps

1. **Checkout Code**: Pulls latest code from repository
2. **Setup Node.js**: Installs Node.js (matrix: v18, v20)
3. **Install Dependencies**: Runs `npm ci` for clean install
4. **Lint Code**: Executes ESLint checks
5. **Type Check**: Runs TypeScript compiler in check mode
6. **Run Tests**: Executes Jest with coverage
7. **Upload Coverage**: Sends coverage to Codecov (optional)
8. **Build Project**: Creates production bundle
9. **Upload Artifacts**: Stores build for deployment

### Status Badge

Add this to your README after first CI run:

```markdown
[![CI Status](https://github.com/yourusername/networth-tracker/workflows/CI%20Pipeline/badge.svg)](https://github.com/yourusername/networth-tracker/actions)
```

---

## 📦 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + TypeScript | UI components and type safety |
| Build Tool | Vite | Fast dev server and bundling |
| State Management | React Context | Global state without Redux |
| Charts | Chart.js + react-chartjs-2 | Data visualization |
| Routing | React Router v6 | Multi-page navigation |
| Testing | Jest + ts-jest | Unit and integration tests |
| Linting | ESLint (Airbnb config) | Code quality |
| Formatting | Prettier | Consistent code style |
| CI/CD | GitHub Actions | Automated testing and builds |

---

## 💡 Usage Examples

### Adding a Crypto Asset

```typescript
const bitcoin = new Asset({
  name: 'Bitcoin Holdings',
  type: AssetType.CRO_CRYPTO,
  value: 0,
  cryptoDetails: {
    coinType: CryptoType.BTC,
    quantity: 0.5,
    pricePerCoin: 60000,
  }
});

await service.addAsset(bitcoin);
```

### Adding a Loan Liability

```typescript
const carLoan = new Liability({
  name: 'Honda Civic Loan',
  type: LiabilityType.CAR_LOAN,
  value: 0,
  loanDetails: {
    principal: 25000,
    interestRate: 4.5,
    monthlyPayment: 467,
    remainingMonths: 60,
  }
});

await service.addLiability(carLoan);
```

### Creating a Snapshot

```typescript
// Capture current portfolio state
await service.createSnapshot();

// View historical snapshots
const snapshots = portfolio.getSnapshotsSorted();
```

### Exporting Data

```typescript
// Export to JSON string
const jsonData = await service.exportData();

// Download as file
const blob = new Blob([jsonData], { type: 'application/json' });
const url = URL.createObjectURL(blob);
// Trigger download...
```

---

## 🔧 Configuration Files

### TypeScript Config (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Vite Config (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

---

## 🌟 Future Enhancements

### Phase 2 Features
- [ ] Multi-currency support (CAD, INR, USD)
- [ ] Real-time exchange rate API integration
- [ ] PDF export of financial reports
- [ ] Email reminders for bill payments
- [ ] Budget planning module
- [ ] Goal tracking (savings targets)

### Phase 3 Features
- [ ] Mobile app (React Native)
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Multi-user support with authentication
- [ ] AI-powered financial insights
- [ ] Investment performance analytics
- [ ] Tax optimization suggestions

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code style (ESLint + Prettier)
- Write tests for new features (maintain 70%+ coverage)
- Update documentation as needed
- Ensure CI pipeline passes

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/networth-tracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/networth-tracker/discussions)
- **Email**: your.email@example.com

---

## 🙏 Acknowledgments

- **Anthropic** for Claude AI assistance
- **React Team** for the amazing framework
- **TypeScript Team** for type safety
- **Open Source Community** for inspiration

---

**Built with ❤️ using OOP, SOLID principles, and open-source technologies**