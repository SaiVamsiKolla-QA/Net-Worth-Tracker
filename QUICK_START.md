# 🚀 Quick Start Guide

Get the Net Worth Tracker up and running in 5 minutes!

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js** (v18.x or v20.x) - [Download here](https://nodejs.org/)
- [ ] **npm** (v9.x or higher) - Comes with Node.js
- [ ] **Git** - [Download here](https://git-scm.com/)
- [ ] A code editor (VS Code recommended)

### Verify Installation

```bash
node --version   # Should show v18.x or v20.x
npm --version    # Should show v9.x or higher
git --version    # Any recent version
```

---

## ⚡ Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/networth-tracker.git
cd networth-tracker
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

### 3. Start Development Server

```bash
npm run dev
```

The app will automatically open at `http://localhost:5173` 🎉

---

## 🎯 First Time Setup

### Adding Your First Asset

1. Navigate to the **Dashboard** (default page)
2. Click **"Assets"** in the navigation menu
3. Click **"Add Asset"** button
4. Fill in the form:
   - **Name**: "My Savings Account"
   - **Type**: Select "Cash"
   - **Value**: Enter amount (e.g., 5000)
5. Click **"Save"**

### Adding Your First Liability

1. Click **"Liabilities"** in the navigation
2. Click **"Add Liability"** button
3. Fill in the form:
   - **Name**: "Credit Card"
   - **Type**: Select "Credit Card"
   - **Value**: Enter amount (e.g., 2000)
4. Click **"Save"**

### Taking Your First Snapshot

1. Return to **Dashboard**
2. Click **"📸 Take Snapshot"**
3. Your current net worth is now saved!
4. Repeat this weekly/monthly to track progress

---

## 📊 Understanding the Dashboard

### Net Worth Card
Shows your current financial summary:
- **Total Assets** (green): Everything you own
- **Total Liabilities** (red): Everything you owe
- **Net Worth** (blue): Assets - Liabilities

### Summary Cards
- **Debt-to-Asset Ratio**: Higher = more debt relative to assets
- **Liquidity Ratio**: Can you cover short-term debts?
- **Monthly Expenses**: Recurring costs (insurance, bills)
- **Total Interest**: What you'll pay on loans

### Charts
- **Historical**: Past net worth from snapshots
- **Projected**: Future net worth (dashed line)
- Use dropdown to adjust projection period (3-36 months)

---

## 🔧 Common Commands

### Development
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Create production build
npm run preview      # Preview production build locally
```

### Testing
```bash
npm test             # Run all tests once
npm run test:watch   # Run tests in watch mode (TDD)
npm run test:coverage # Generate coverage report
```

### Code Quality
```bash
npm run lint         # Check for code issues
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
npm run type-check   # Verify TypeScript types
```

---

## 💾 Data Management

### Export Your Data
1. Go to **Dashboard**
2. Click **"💾 Export Data"**
3. Save the JSON file (backup regularly!)

### Import Data
1. Click **"📂 Import Data"**
2. Select your previously exported JSON file
3. Your data will be restored

**Important**: Data is stored in your browser's LocalStorage. Always export backups!

---

## 🎨 Customization

### Toggle Dark Mode
- Click the **🌙/☀️** icon in the top-right corner
- Theme preference is saved automatically

### Change Projection Period
- Use the dropdown above the chart
- Options: 3, 6, 12, 24, 36 months

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173 (Linux/Mac)
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Dependencies Won't Install
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tests Failing
```bash
# Ensure you're in the project root
pwd

# Run specific test file
npm test -- Asset.test.ts

# Update snapshots if needed
npm test -- -u
```

### Build Errors
```bash
# Check TypeScript errors
npm run type-check

# Fix linting issues
npm run lint:fix
```

---

## 📚 Next Steps

### Learn the Architecture
- Read [README.md](README.md) for detailed documentation
- Explore `src/models/` to understand the domain layer
- Check `src/services/` for business logic

### Add Custom Features
1. Create a new branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `npm test`
4. Commit: `git commit -m "Add my feature"`
5. Push: `git push origin feature/my-feature`

### Contribute
- Follow the [Contributing Guide](README.md#-contributing)
- Open issues for bugs or feature requests
- Submit pull requests

---

## 🔗 Useful Resources

- **React Docs**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Chart.js Docs**: https://www.chartjs.org/docs/
- **Vite Guide**: https://vitejs.dev/guide/
- **Jest Docs**: https://jestjs.io/docs/getting-started

---

## 💡 Pro Tips

1. **Regular Backups**: Export data monthly
2. **Consistent Snapshots**: Take weekly snapshots for better tracking
3. **Categorize Wisely**: Use correct asset/liability types for accurate reporting
4. **Update Prices**: Keep crypto/metal prices current
5. **Review Projections**: Adjust recurring expenses as they change

---

## ❓ Getting Help

- **Bug Reports**: [Open an issue](https://github.com/yourusername/networth-tracker/issues)
- **Feature Requests**: [Start a discussion](https://github.com/yourusername/networth-tracker/discussions)
- **Questions**: Check existing issues or create a new one

---

**Happy Tracking! 📈💰**