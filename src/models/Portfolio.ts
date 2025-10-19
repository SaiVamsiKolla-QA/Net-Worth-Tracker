import { Asset } from './Asset';
import { Liability } from './Liability';
import { Snapshot } from './Snapshot';
import { IPortfolio, IAsset, ILiability, ISnapshot } from './types';

/**
 * Portfolio class - Aggregate Root in DDD
 * Manages collections of assets and liabilities
 * Follows Single Responsibility and Open/Closed Principles
 */
export class Portfolio implements IPortfolio {
  private _assets: Asset[] = [];
  private _liabilities: Liability[] = [];
  private _snapshots: Snapshot[] = [];

  constructor(data?: IPortfolio) {
    if (data) {
      this._assets = data.assets.map((a) => Asset.fromJSON(a));
      this._liabilities = data.liabilities.map((l) => Liability.fromJSON(l));
      this._snapshots = data.snapshots.map((s) => Snapshot.fromJSON(s));
    }
  }

  // Getters (Encapsulation)
  get assets(): Asset[] {
    return [...this._assets];
  }

  get liabilities(): Liability[] {
    return [...this._liabilities];
  }

  get snapshots(): Snapshot[] {
    return [...this._snapshots];
  }

  /**
   * Add a new asset to portfolio
   */
  addAsset(asset: Asset): void {
    this._assets.push(asset);
  }

  /**
   * Update an existing asset
   */
  updateAsset(id: string, data: Partial<Asset>): boolean {
    const asset = this._assets.find((a) => a.id === id);
    if (!asset) return false;

    asset.update(data);
    return true;
  }

  /**
   * Remove an asset from portfolio
   */
  removeAsset(id: string): boolean {
    const index = this._assets.findIndex((a) => a.id === id);
    if (index === -1) return false;

    this._assets.splice(index, 1);
    return true;
  }

  /**
   * Get asset by ID
   */
  getAsset(id: string): Asset | undefined {
    return this._assets.find((a) => a.id === id);
  }

  /**
   * Add a new liability to portfolio
   */
  addLiability(liability: Liability): void {
    this._liabilities.push(liability);
  }

  /**
   * Update an existing liability
   */
  updateLiability(id: string, data: Partial<Liability>): boolean {
    const liability = this._liabilities.find((l) => l.id === id);
    if (!liability) return false;

    liability.update(data);
    return true;
  }

  /**
   * Remove a liability from portfolio
   */
  removeLiability(id: string): boolean {
    const index = this._liabilities.findIndex((l) => l.id === id);
    if (index === -1) return false;

    this._liabilities.splice(index, 1);
    return true;
  }

  /**
   * Get liability by ID
   */
  getLiability(id: string): Liability | undefined {
    return this._liabilities.find((l) => l.id === id);
  }

  /**
   * Calculate total assets value
   */
  getTotalAssets(): number {
    return this._assets.reduce((sum, asset) => sum + asset.getValue(), 0);
  }

  /**
   * Calculate total liabilities value
   */
  getTotalLiabilities(): number {
    return this._liabilities.reduce((sum, liability) => sum + liability.getValue(), 0);
  }

  /**
   * Calculate net worth (assets - liabilities)
   */
  getNetWorth(): number {
    return this.getTotalAssets() - this.getTotalLiabilities();
  }

  /**
   * Create a snapshot of current portfolio state
   */
  createSnapshot(): Snapshot {
    const snapshot = new Snapshot({
      date: new Date(),
      totalAssets: this.getTotalAssets(),
      totalLiabilities: this.getTotalLiabilities(),
      netWorth: this.getNetWorth(),
      assets: this._assets.map((a) => a.toJSON()),
      liabilities: this._liabilities.map((l) => l.toJSON()),
    });

    this._snapshots.push(snapshot);
    return snapshot;
  }

  /**
   * Get all snapshots sorted by date (newest first)
   */
  getSnapshotsSorted(): Snapshot[] {
    return [...this._snapshots].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
  }

  /**
   * Remove a snapshot
   */
  removeSnapshot(id: string): boolean {
    const index = this._snapshots.findIndex((s) => s.id === id);
    if (index === -1) return false;

    this._snapshots.splice(index, 1);
    return true;
  }

  /**
   * Clear all data
   */
  clear(): void {
    this._assets = [];
    this._liabilities = [];
    this._snapshots = [];
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): IPortfolio {
    return {
      assets: this._assets.map((a) => a.toJSON()),
      liabilities: this._liabilities.map((l) => l.toJSON()),
      snapshots: this._snapshots.map((s) => s.toJSON()),
    };
  }

  /**
   * Factory method to create Portfolio from JSON
   */
  static fromJSON(json: IPortfolio): Portfolio {
    return new Portfolio(json);
  }
}