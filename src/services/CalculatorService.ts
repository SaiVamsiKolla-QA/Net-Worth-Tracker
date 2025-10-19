import { Asset } from '../models/Asset';
import { Liability } from '../models/Liability';

/**
 * Calculator Service - Business Logic Layer
 * Handles all financial calculations
 * Follows Single Responsibility Principle
 */
export class CalculatorService {
  /**
   * Calculate total value of assets
   */
  calculateTotalAssets(assets: Asset[]): number {
    return assets.reduce((sum, asset) => sum + asset.getValue(), 0);
  }

  /**
   * Calculate total value of liabilities
   */
  calculateTotalLiabilities(liabilities: Liability[]): number {
    return liabilities.reduce((sum, liability) => sum + liability.getValue(), 0);
  }

  /**
   * Calculate net worth (assets - liabilities)
   */
  calculateNetWorth(assets: Asset[], liabilities: Liability[]): number {
    const totalAssets = this.calculateTotalAssets(assets);
    const totalLiabilities = this.calculateTotalLiabilities(liabilities);
    return totalAssets - totalLiabilities;
  }

  /**
   * Calculate asset allocation percentages
   */
  calculateAssetAllocation(assets: Asset[]): Map<string, number> {
    const total = this.calculateTotalAssets(assets);
    const allocation = new Map<string, number>();

    assets.forEach((asset) => {
      const percentage = total > 0 ? (asset.getValue() / total) * 100 : 0;
      allocation.set(asset.type, (allocation.get(asset.type) || 0) + percentage);
    });

    return allocation;
  }

  /**
   * Calculate liability breakdown percentages
   */
  calculateLiabilityBreakdown(liabilities: Liability[]): Map<string, number> {
    const total = this.calculateTotalLiabilities(liabilities);
    const breakdown = new Map<string, number>();

    liabilities.forEach((liability) => {
      const percentage = total > 0 ? (liability.getValue() / total) * 100 : 0;
      breakdown.set(liability.type, (breakdown.get(liability.type) || 0) + percentage);
    });

    return breakdown;
  }

  /**
   * Calculate total loan interest across all loans
   */
  calculateTotalLoanInterest(liabilities: Liability[]): number {
    return liabilities
      .filter((l) => l.isLoan())
      .reduce((sum, liability) => sum + liability.getTotalInterest(), 0);
  }

  /**
   * Calculate monthly recurring expenses total
   */
  calculateMonthlyRecurringExpenses(liabilities: Liability[]): number {
    return liabilities
      .filter((l) => l.isRecurring())
      .reduce((sum, liability) => {
        const recurringDetails = liability.recurringDetails;
        return sum + (recurringDetails?.monthlyAmount || 0);
      }, 0);
  }

  /**
   * Calculate debt-to-asset ratio
   */
  calculateDebtToAssetRatio(assets: Asset[], liabilities: Liability[]): number {
    const totalAssets = this.calculateTotalAssets(assets);
    const totalLiabilities = this.calculateTotalLiabilities(liabilities);

    if (totalAssets === 0) return 0;
    return (totalLiabilities / totalAssets) * 100;
  }

  /**
   * Calculate liquidity ratio (liquid assets / total liabilities)
   * Liquid assets: Cash, High Savings
   */
  calculateLiquidityRatio(assets: Asset[], liabilities: Liability[]): number {
    const liquidAssetTypes = ['Cash', 'High Savings Account'];
    const liquidAssets = assets
      .filter((a) => liquidAssetTypes.includes(a.type))
      .reduce((sum, asset) => sum + asset.getValue(), 0);

    const totalLiabilities = this.calculateTotalLiabilities(liabilities);

    if (totalLiabilities === 0) return Infinity;
    return liquidAssets / totalLiabilities;
  }

  /**
   * Format currency to CAD
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Format percentage
   */
  formatPercentage(value: number, decimals: number = 1): string {
    return `${value.toFixed(decimals)}%`;
  }
}