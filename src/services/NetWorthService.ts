import { Portfolio } from '../models/Portfolio';
import { Asset } from '../models/Asset';
import { Liability } from '../models/Liability';
import { IRepository } from '../repositories/IRepository';
import { CalculatorService } from './CalculatorService';
import { ProjectionService } from './ProjectionService';
import { AssetFormData, LiabilityFormData } from '../models/types';

/**
 * NetWorth Service - Application Service Layer
 * Orchestrates business operations
 * Follows Dependency Injection and Single Responsibility Principles
 */
export class NetWorthService {
  private portfolio: Portfolio;

  private repository: IRepository;

  private calculator: CalculatorService;

  private projection: ProjectionService;

  constructor(repository: IRepository) {
    this.portfolio = new Portfolio();
    this.repository = repository;
    this.calculator = new CalculatorService();
    this.projection = new ProjectionService();
  }

  /**
   * Initialize service by loading data from repository
   */
  async initialize(): Promise<void> {
    const data = await this.repository.load();
    if (data) {
      this.portfolio = Portfolio.fromJSON(data);
    }
  }

  /**
   * Save current portfolio state
   */
  async save(): Promise<void> {
    await this.repository.save(this.portfolio.toJSON());
  }

  /**
   * Get current portfolio
   */
  getPortfolio(): Portfolio {
    return this.portfolio;
  }

  /**
   * Add new asset
   */
  async addAsset(data: AssetFormData): Promise<Asset> {
    const asset = new Asset(data);
    this.portfolio.addAsset(asset);
    await this.save();
    return asset;
  }

  /**
   * Update existing asset
   */
  async updateAsset(id: string, data: Partial<AssetFormData>): Promise<boolean> {
    const success = this.portfolio.updateAsset(id, data);
    if (success) {
      await this.save();
    }
    return success;
  }

  /**
   * Delete asset
   */
  async deleteAsset(id: string): Promise<boolean> {
    const success = this.portfolio.removeAsset(id);
    if (success) {
      await this.save();
    }
    return success;
  }

  /**
   * Add new liability
   */
  async addLiability(data: LiabilityFormData): Promise<Liability> {
    const liability = new Liability(data);
    this.portfolio.addLiability(liability);
    await this.save();
    return liability;
  }

  /**
   * Update existing liability
   */
  async updateLiability(id: string, data: Partial<LiabilityFormData>): Promise<boolean> {
    const success = this.portfolio.updateLiability(id, data);
    if (success) {
      await this.save();
    }
    return success;
  }

  /**
   * Delete liability
   */
  async deleteLiability(id: string): Promise<boolean> {
    const success = this.portfolio.removeLiability(id);
    if (success) {
      await this.save();
    }
    return success;
  }

  /**
   * Create snapshot of current state
   */
  async createSnapshot(): Promise<void> {
    this.portfolio.createSnapshot();
    await this.save();
  }

  /**
   * Delete snapshot
   */
  async deleteSnapshot(id: string): Promise<boolean> {
    const success = this.portfolio.removeSnapshot(id);
    if (success) {
      await this.save();
    }
    return success;
  }

  /**
   * Get summary statistics
   */
  getSummary() {
    const {assets} = this.portfolio;
    const {liabilities} = this.portfolio;

    return {
      totalAssets: this.calculator.calculateTotalAssets(assets),
      totalLiabilities: this.calculator.calculateTotalLiabilities(liabilities),
      netWorth: this.calculator.calculateNetWorth(assets, liabilities),
      assetAllocation: this.calculator.calculateAssetAllocation(assets),
      liabilityBreakdown: this.calculator.calculateLiabilityBreakdown(liabilities),
      debtToAssetRatio: this.calculator.calculateDebtToAssetRatio(assets, liabilities),
      liquidityRatio: this.calculator.calculateLiquidityRatio(assets, liabilities),
      totalLoanInterest: this.calculator.calculateTotalLoanInterest(liabilities),
      monthlyRecurringExpenses: this.calculator.calculateMonthlyRecurringExpenses(liabilities),
    };
  }

  /**
   * Get net worth projections
   */
  getProjections(months: number = 12) {
    const {assets} = this.portfolio;
    const {liabilities} = this.portfolio;
    const currentAssets = this.calculator.calculateTotalAssets(assets);

    return this.projection.projectNetWorth(currentAssets, liabilities, months);
  }

  /**
   * Export portfolio data
   */
  async exportData(): Promise<string> {
    return this.repository.export();
  }

  /**
   * Import portfolio data
   */
  async importData(jsonString: string): Promise<void> {
    const data = await this.repository.import(jsonString);
    this.portfolio = Portfolio.fromJSON(data);
  }

  /**
   * Clear all data
   */
  async clearAll(): Promise<void> {
    this.portfolio.clear();
    await this.repository.clear();
  }
}