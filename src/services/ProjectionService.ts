import { Liability } from '../models/Liability';

/**
 * Projection Service - Future Value Calculations
 * Handles projections of net worth with recurring expenses
 */
export class ProjectionService {
  /**
   * Project future liability values
   * @param liabilities Current liabilities
   * @param months Number of months to project
   * @returns Projected total liability value
   */
  projectLiabilities(liabilities: Liability[], months: number): number {
    return liabilities.reduce((total, liability) => {
      return total + liability.getProjectedValue(months);
    }, 0);
  }

  /**
   * Project net worth over time
   * Assumes assets remain constant, liabilities change based on projections
   * @param currentAssets Current total asset value
   * @param liabilities Current liabilities
   * @param months Number of months to project
   * @returns Array of {month, netWorth} objects
   */
  projectNetWorth(
    currentAssets: number,
    liabilities: Liability[],
    months: number
  ): Array<{ month: number; netWorth: number }> {
    const projections: Array<{ month: number; netWorth: number }> = [];

    // Current month (month 0)
    const currentLiabilities = liabilities.reduce(
      (sum, l) => sum + l.getValue(),
      0
    );
    projections.push({ month: 0, netWorth: currentAssets - currentLiabilities });

    // Future months
    for (let month = 1; month <= months; month++) {
      const projectedLiabilities = this.projectLiabilities(liabilities, month);
      const projectedNetWorth = currentAssets - projectedLiabilities;
      projections.push({ month, netWorth: projectedNetWorth });
    }

    return projections;
  }

  /**
   * Calculate total recurring expenses over period
   * @param liabilities Current liabilities
   * @param months Number of months
   * @returns Total recurring expenses
   */
  calculateRecurringExpenses(liabilities: Liability[], months: number): number {
    return liabilities
      .filter((l) => l.isRecurring())
      .reduce((total, liability) => {
        const monthlyAmount = liability.recurringDetails?.monthlyAmount || 0;
        return total + monthlyAmount * months;
      }, 0);
  }

  /**
   * Calculate total loan payments over period
   * @param liabilities Current liabilities
   * @param months Number of months
   * @returns Total loan payments (principal + interest)
   */
  calculateLoanPayments(liabilities: Liability[], months: number): number {
    return liabilities
      .filter((l) => l.isLoan())
      .reduce((total, liability) => {
        const loanDetails = liability.loanDetails;
        if (!loanDetails) return total;

        const paymentMonths = Math.min(months, loanDetails.remainingMonths);
        return total + loanDetails.monthlyPayment * paymentMonths;
      }, 0);
  }

  /**
   * Project when loans will be paid off
   * @param liabilities Current liabilities
   * @returns Map of liability name to months until paid off
   */
  calculateLoanPayoffTimeline(liabilities: Liability[]): Map<string, number> {
    const timeline = new Map<string, number>();

    liabilities
      .filter((l) => l.isLoan())
      .forEach((liability) => {
        if (liability.loanDetails) {
          timeline.set(liability.name, liability.loanDetails.remainingMonths);
        }
      });

    return timeline;
  }

  /**
   * Calculate break-even point (when net worth becomes positive)
   * @param currentNetWorth Current net worth
   * @param liabilities Current liabilities
   * @param monthlyAssetGrowth Expected monthly asset growth
   * @returns Months until break-even, or null if already positive
   */
  calculateBreakEvenPoint(
    currentNetWorth: number,
    liabilities: Liability[],
    monthlyAssetGrowth: number = 0
  ): number | null {
    if (currentNetWorth >= 0) return null;

    // Simple projection assuming linear asset growth
    let month = 0;
    let projectedNetWorth = currentNetWorth;
    const maxMonths = 360; // Cap at 30 years

    while (projectedNetWorth < 0 && month < maxMonths) {
      month++;
      const projectedLiabilities = this.projectLiabilities(liabilities, month);
      const projectedAssets = Math.abs(currentNetWorth) + monthlyAssetGrowth * month;
      projectedNetWorth = projectedAssets - projectedLiabilities;
    }

    return month < maxMonths ? month : null;
  }
}