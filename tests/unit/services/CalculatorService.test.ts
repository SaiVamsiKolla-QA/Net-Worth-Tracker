import { CalculatorService } from '../../../src/services/CalculatorService';
import { Asset } from '../../../src/models/Asset';
import { Liability } from '../../../src/models/Liability';
import { AssetType, LiabilityType } from '../../../src/models/types';

describe('CalculatorService', () => {
  let calculator: CalculatorService;

  beforeEach(() => {
    calculator = new CalculatorService();
  });

  describe('Total Assets Calculation', () => {
    it('should calculate total assets correctly', () => {
      const assets = [
        new Asset({ name: 'Cash', type: AssetType.CASH, value: 5000 }),
        new Asset({ name: 'TFSA', type: AssetType.TFSA, value: 20000 }),
        new Asset({ name: 'RRSP', type: AssetType.RRSP, value: 35000 }),
      ];

      const total = calculator.calculateTotalAssets(assets);
      expect(total).toBe(60000);
    });

    it('should return 0 for empty asset array', () => {
      const total = calculator.calculateTotalAssets([]);
      expect(total).toBe(0);
    });
  });

  describe('Total Liabilities Calculation', () => {
    it('should calculate total liabilities correctly', () => {
      const liabilities = [
        new Liability({ name: 'Credit Card', type: LiabilityType.CREDIT_CARD, value: 2000 }),
        new Liability({ name: 'Car Loan', type: LiabilityType.CAR_LOAN, value: 15000 }),
      ];

      const total = calculator.calculateTotalLiabilities(liabilities);
      expect(total).toBe(17000);
    });
  });

  describe('Net Worth Calculation', () => {
    it('should calculate positive net worth', () => {
      const assets = [
        new Asset({ name: 'Cash', type: AssetType.CASH, value: 50000 }),
      ];
      const liabilities = [
        new Liability({ name: 'Credit Card', type: LiabilityType.CREDIT_CARD, value: 5000 }),
      ];

      const netWorth = calculator.calculateNetWorth(assets, liabilities);
      expect(netWorth).toBe(45000);
    });

    it('should calculate negative net worth', () => {
      const assets = [
        new Asset({ name: 'Cash', type: AssetType.CASH, value: 10000 }),
      ];
      const liabilities = [
        new Liability({ name: 'Home Loan', type: LiabilityType.HOME_LOAN, value: 300000 }),
      ];

      const netWorth = calculator.calculateNetWorth(assets, liabilities);
      expect(netWorth).toBe(-290000);
    });
  });

  describe('Asset Allocation', () => {
    it('should calculate asset allocation percentages', () => {
      const assets = [
        new Asset({ name: 'Cash', type: AssetType.CASH, value: 10000 }),
        new Asset({ name: 'TFSA', type: AssetType.TFSA, value: 30000 }),
        new Asset({ name: 'RRSP', type: AssetType.RRSP, value: 60000 }),
      ];

      const allocation = calculator.calculateAssetAllocation(assets);

      expect(allocation.get(AssetType.CASH)).toBeCloseTo(10, 1);
      expect(allocation.get(AssetType.TFSA)).toBeCloseTo(30, 1);
      expect(allocation.get(AssetType.RRSP)).toBeCloseTo(60, 1);
    });
  });

  describe('Debt-to-Asset Ratio', () => {
    it('should calculate debt-to-asset ratio', () => {
      const assets = [
        new Asset({ name: 'Total Assets', type: AssetType.CASH, value: 100000 }),
      ];
      const liabilities = [
        new Liability({ name: 'Total Debt', type: LiabilityType.HOME_LOAN, value: 50000 }),
      ];

      const ratio = calculator.calculateDebtToAssetRatio(assets, liabilities);
      expect(ratio).toBe(50);
    });

    it('should return 0 when no assets', () => {
      const assets: Asset[] = [];
      const liabilities = [
        new Liability({ name: 'Debt', type: LiabilityType.CREDIT_CARD, value: 5000 }),
      ];

      const ratio = calculator.calculateDebtToAssetRatio(assets, liabilities);
      expect(ratio).toBe(0);
    });
  });

  describe('Currency Formatting', () => {
    it('should format currency correctly', () => {
      expect(calculator.formatCurrency(1234.56)).toBe('$1,234.56');
      expect(calculator.formatCurrency(1000000)).toBe('$1,000,000.00');
      expect(calculator.formatCurrency(0)).toBe('$0.00');
    });
  });

  describe('Percentage Formatting', () => {
    it('should format percentage correctly', () => {
      expect(calculator.formatPercentage(25.5)).toBe('25.5%');
      expect(calculator.formatPercentage(100, 2)).toBe('100.00%');
      expect(calculator.formatPercentage(0)).toBe('0.0%');
    });
  });
});