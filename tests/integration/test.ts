import { NetWorthService } from '../../src/services/NetWorthService';
import { LocalStorageRepository } from '../../src/repositories/LocalStorageRepository';
import { AssetType, LiabilityType } from '../../src/models/types';

describe('Portfolio Integration Tests', () => {
  let service: NetWorthService;
  let repository: LocalStorageRepository;

  beforeEach(async () => {
    // Clear localStorage before each test
    localStorage.clear();
    repository = new LocalStorageRepository('test_portfolio');
    service = new NetWorthService(repository);
    await service.initialize();
  });

  afterEach(async () => {
    await service.clearAll();
  });

  describe('End-to-End Workflow', () => {
    it('should handle complete portfolio lifecycle', async () => {
      // Add assets
      const cash = await service.addAsset({
        name: 'Checking Account',
        type: AssetType.CASH,
        value: 10000,
      });

      const tfsa = await service.addAsset({
        name: 'TFSA Investment',
        type: AssetType.TFSA,
        value: 50000,
      });

      // Add liabilities
      const creditCard = await service.addLiability({
        name: 'Credit Card',
        type: LiabilityType.CREDIT_CARD,
        value: 2000,
      });

      const carLoan = await service.addLiability({
        name: 'Car Loan',
        type: LiabilityType.CAR_LOAN,
        value: 0,
        loanDetails: {
          principal: 20000,
          interestRate: 5,
          monthlyPayment: 377,
          remainingMonths: 60,
        },
      });

      // Verify summary
      const summary = service.getSummary();
      expect(summary.totalAssets).toBe(60000);
      expect(summary.totalLiabilities).toBe(22000);
      expect(summary.netWorth).toBe(38000);

      // Create snapshot
      await service.createSnapshot();
      const portfolio = service.getPortfolio();
      expect(portfolio.snapshots.length).toBe(1);

      // Update asset
      await service.updateAsset(tfsa.id, { value: 55000 });
      const updatedSummary = service.getSummary();
      expect(updatedSummary.totalAssets).toBe(65000);

      // Delete liability
      await service.deleteLiability(creditCard.id);
      const finalSummary = service.getSummary();
      expect(finalSummary.totalLiabilities).toBe(20000);

      // Verify persistence
      const exportedData = await service.exportData();
      expect(exportedData).toBeTruthy();

      // Clear and reimport
      await service.clearAll();
      expect(service.getPortfolio().assets.length).toBe(0);

      await service.importData(exportedData);
      expect(service.getPortfolio().assets.length).toBe(2);
      expect(service.getPortfolio().liabilities.length).toBe(1);
    });

    it('should calculate projections correctly', async () => {
      await service.addAsset({
        name: 'Savings',
        type: AssetType.HIGH_SAVINGS,
        value: 100000,
      });

      await service.addLiability({
        name: 'Monthly Insurance',
        type: LiabilityType.CAR_INSURANCE,
        value: 0,
        recurringDetails: {
          monthlyAmount: 200,
          annualAmount: 2400,
        },
      });

      const projections = service.getProjections(12);
      expect(projections.length).toBe(13); // Current + 12 months
      expect(projections[0].month).toBe(0);
      expect(projections[12].month).toBe(12);

      // Verify net worth decreases due to recurring expenses
      expect(projections[12].netWorth).toBeLessThan(projections[0].netWorth);
    });

    it('should handle multiple snapshots', async () => {
      await service.addAsset({
        name: 'Investment',
        type: AssetType.RRSP,
        value: 50000,
      });

      // Create first snapshot
      await service.createSnapshot();

      // Modify portfolio
      await service.addAsset({
        name: 'Cash',
        type: AssetType.CASH,
        value: 10000,
      });

      // Create second snapshot
      await service.createSnapshot();

      const portfolio = service.getPortfolio();
      const snapshots = portfolio.getSnapshotsSorted();

      expect(snapshots.length).toBe(2);
      expect(snapshots[0].totalAssets).toBe(60000); // Most recent
      expect(snapshots[1].totalAssets).toBe(50000); // Older
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid asset updates', async () => {
      const result = await service.updateAsset('invalid-id', { value: 100 });
      expect(result).toBe(false);
    });

    it('should handle invalid liability deletions', async () => {
      const result = await service.deleteLiability('invalid-id');
      expect(result).toBe(false);
    });

    it('should handle malformed import data', async () => {
      await expect(service.importData('invalid json')).rejects.toThrow();
    });
  });
});