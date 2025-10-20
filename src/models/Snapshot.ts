import { v4 as uuidv4 } from 'uuid';
import { ISnapshot, IAsset, ILiability } from './types';

/**
 * Snapshot class - Memento Pattern
 * Captures portfolio state at a specific point in time
 */
export class Snapshot implements ISnapshot {
  id: string;

  date: Date;

  totalAssets: number;

  totalLiabilities: number;

  netWorth: number;

  assets: IAsset[];

  liabilities: ILiability[];

  constructor(data: Omit<ISnapshot, 'id'>, id?: string) {
    this.id = id || uuidv4();
    this.date = data.date;
    this.totalAssets = data.totalAssets;
    this.totalLiabilities = data.totalLiabilities;
    this.netWorth = data.netWorth;
    this.assets = data.assets;
    this.liabilities = data.liabilities;
  }

  /**
   * Get formatted date string
   */
  getFormattedDate(): string {
    return this.date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): ISnapshot {
    return {
      id: this.id,
      date: this.date,
      totalAssets: this.totalAssets,
      totalLiabilities: this.totalLiabilities,
      netWorth: this.netWorth,
      assets: this.assets,
      liabilities: this.liabilities,
    };
  }

  /**
   * Factory method to create Snapshot from JSON
   */
  static fromJSON(json: ISnapshot): Snapshot {
    const snapshot = new Snapshot(
      {
        date: new Date(json.date),
        totalAssets: json.totalAssets,
        totalLiabilities: json.totalLiabilities,
        netWorth: json.netWorth,
        assets: json.assets,
        liabilities: json.liabilities,
      },
      json.id
    );
    return snapshot;
  }
}