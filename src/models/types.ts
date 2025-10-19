// Enums for Asset Types
export enum AssetType {
    CASH = 'Cash',
    HIGH_SAVINGS = 'High Savings Account',
    TFSA = 'Wealthsimple TFSA',
    TFSA_MANAGED = 'Wealthsimple TFSA Managed',
    RRSP = 'Wealthsimple RRSP',
    RRSP_MANAGED = 'Wealthsimple RRSP Managed',
    CRYPTO_LONG_TERM = 'Wealthsimple Long-Term Crypto',
    UNREGISTERED = 'Wealthsimple Unregistered',
    CRO_CRYPTO = 'CRO Crypto',
    GOLD = 'Gold',
    SILVER = 'Silver',
  }
  
  // Enums for Liability Types
  export enum LiabilityType {
    CREDIT_CARD = 'Credit Card',
    LINE_OF_CREDIT = 'Line of Credit',
    CAR_LOAN = 'Car Loan',
    HOME_LOAN = 'Home Loan',
    CAR_INSURANCE = 'Car Insurance',
    HOME_INSURANCE = 'Home Insurance',
    HEALTH_INSURANCE = 'Health Insurance',
    LIFE_INSURANCE = 'Life Insurance',
    PROPERTY_TAX = 'Property Taxes',
    SECURITY_BILLS = 'Security Bills',
  }
  
  // Crypto coin types
  export enum CryptoType {
    BTC = 'Bitcoin',
    ETH = 'Ethereum',
    CRO = 'Crypto.com Coin',
    OTHER = 'Other',
  }
  
  // Precious metal measurement
  export enum MetalUnit {
    GRAMS = 'grams',
    OUNCES = 'ounces',
  }
  
  // Base interface for identifiable entities
  export interface IEntity {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Asset-specific interfaces
  export interface ICryptoAsset {
    coinType: CryptoType;
    quantity: number;
    pricePerCoin: number;
  }
  
  export interface IPreciousMetalAsset {
    unit: MetalUnit;
    weight: number;
    pricePerUnit: number;
  }
  
  // Liability-specific interfaces
  export interface ILoan {
    principal: number;
    interestRate: number;
    monthlyPayment: number;
    remainingMonths: number;
  }
  
  export interface IRecurringExpense {
    monthlyAmount: number;
    annualAmount: number;
  }
  
  // Main interfaces
  export interface IAsset extends IEntity {
    type: AssetType;
    value: number;
    cryptoDetails?: ICryptoAsset;
    metalDetails?: IPreciousMetalAsset;
  }
  
  export interface ILiability extends IEntity {
    type: LiabilityType;
    value: number;
    loanDetails?: ILoan;
    recurringDetails?: IRecurringExpense;
  }
  
  export interface ISnapshot {
    id: string;
    date: Date;
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
    assets: IAsset[];
    liabilities: ILiability[];
  }
  
  export interface IPortfolio {
    assets: IAsset[];
    liabilities: ILiability[];
    snapshots: ISnapshot[];
  }
  
  // Chart data types
  export interface IChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill?: boolean;
    }[];
  }
  
  // Form data types
  export type AssetFormData = Omit<IAsset, 'id' | 'createdAt' | 'updatedAt'>;
  export type LiabilityFormData = Omit<ILiability, 'id' | 'createdAt' | 'updatedAt'>;