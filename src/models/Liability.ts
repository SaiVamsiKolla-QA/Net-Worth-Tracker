import { v4 as uuidv4 } from 'uuid';
import {
  ILiability,
  LiabilityType,
  ILoan,
  IRecurringExpense,
  LiabilityFormData,
} from './types';

/**
 * Liability class representing any financial liability
 * Follows Single Responsibility Principle
 */
export class Liability implements ILiability {
  id: string;

  name: string;

  type: LiabilityType;

  value: number;

  loanDetails?: ILoan;

  recurringDetails?: IRecurringExpense;

  createdAt: Date;

  updatedAt: Date;

  constructor(data: LiabilityFormData, id?: string) {
    this.id = id || uuidv4();
    this.name = data.name;
    this.type = data.type;
    this.value = data.value;
    this.loanDetails = data.loanDetails;
    this.recurringDetails = data.recurringDetails;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.calculateValue();
  }

  /**
   * Calculate liability value based on type
   * Strategy Pattern for different calculation methods
   */
  private calculateValue(): void {
    if (this.loanDetails) {
      // For loans, value is the outstanding principal
      this.value = this.loanDetails.principal;
    } else if (this.recurringDetails) {
      // For recurring expenses, use annual amount as liability
      this.value = this.recurringDetails.annualAmount;
    }
    // For other types (e.g., credit card), value is set directly
  }

  /**
   * Calculate total interest over remaining loan period
   */
  getTotalInterest(): number {
    if (!this.loanDetails) return 0;

    const totalPayments =
      this.loanDetails.monthlyPayment * this.loanDetails.remainingMonths;
    return totalPayments - this.loanDetails.principal;
  }

  /**
   * Calculate total loan cost (principal + interest)
   */
  getTotalLoanCost(): number {
    if (!this.loanDetails) return this.value;
    return this.loanDetails.principal + this.getTotalInterest();
  }

  /**
   * Get projected liability value after N months
   * @param months Number of months to project
   */
  getProjectedValue(months: number): number {
    if (this.loanDetails && months <= this.loanDetails.remainingMonths) {
      // Calculate remaining principal after N payments
      const monthlyInterestRate = this.loanDetails.interestRate / 12 / 100;
      const payment = this.loanDetails.monthlyPayment;
      let balance = this.loanDetails.principal;

      for (let i = 0; i < months; i++) {
        const interest = balance * monthlyInterestRate;
        const principalPayment = payment - interest;
        balance -= principalPayment;
      }

      return Math.max(0, balance);
    }

    if (this.recurringDetails) {
      // Recurring expenses accumulate
      return this.recurringDetails.monthlyAmount * months;
    }

    return this.value;
  }

  /**
   * Update liability details
   */
  update(data: Partial<LiabilityFormData>): void {
    if (data.name !== undefined) this.name = data.name;
    if (data.type !== undefined) this.type = data.type;
    if (data.value !== undefined) this.value = data.value;
    if (data.loanDetails !== undefined) this.loanDetails = data.loanDetails;
    if (data.recurringDetails !== undefined) this.recurringDetails = data.recurringDetails;

    this.updatedAt = new Date();
    this.calculateValue();
  }

  /**
   * Check if liability is a loan
   */
  isLoan(): boolean {
    return this.loanDetails !== undefined;
  }

  /**
   * Check if liability is recurring
   */
  isRecurring(): boolean {
    return this.recurringDetails !== undefined;
  }

  /**
   * Get liability value
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): ILiability {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      value: this.value,
      loanDetails: this.loanDetails,
      recurringDetails: this.recurringDetails,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Factory method to create Liability from JSON
   */
  static fromJSON(json: ILiability): Liability {
    const liability = new Liability(
      {
        name: json.name,
        type: json.type,
        value: json.value,
        loanDetails: json.loanDetails,
        recurringDetails: json.recurringDetails,
      },
      json.id
    );
    liability.createdAt = new Date(json.createdAt);
    liability.updatedAt = new Date(json.updatedAt);
    return liability;
  }
}