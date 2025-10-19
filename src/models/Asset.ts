import { v4 as uuidv4 } from 'uuid';
import {
  IAsset,
  AssetType,
  ICryptoAsset,
  IPreciousMetalAsset,
  AssetFormData,
} from './types';

/**
 * Asset class representing any financial asset
 * Follows Single Responsibility Principle - only handles asset data
 */
export class Asset implements IAsset {
  id: string;
  name: string;
  type: AssetType;
  value: number;
  cryptoDetails?: ICryptoAsset;
  metalDetails?: IPreciousMetalAsset;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: AssetFormData, id?: string) {
    this.id = id || uuidv4();
    this.name = data.name;
    this.type = data.type;
    this.value = data.value;
    this.cryptoDetails = data.cryptoDetails;
    this.metalDetails = data.metalDetails;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.calculateValue();
  }

  /**
   * Calculate asset value based on type
   * Strategy Pattern - different calculation strategies for different asset types
   */
  private calculateValue(): void {
    if (this.cryptoDetails) {
      this.value = this.cryptoDetails.quantity * this.cryptoDetails.pricePerCoin;
    } else if (this.metalDetails) {
      this.value = this.metalDetails.weight * this.metalDetails.pricePerUnit;
    }
    // For other types, value is set directly
  }

  /**
   * Update asset details
   * @param data Partial asset data to update
   */
  update(data: Partial<AssetFormData>): void {
    if (data.name !== undefined) this.name = data.name;
    if (data.type !== undefined) this.type = data.type;
    if (data.value !== undefined) this.value = data.value;
    if (data.cryptoDetails !== undefined) this.cryptoDetails = data.cryptoDetails;
    if (data.metalDetails !== undefined) this.metalDetails = data.metalDetails;

    this.updatedAt = new Date();
    this.calculateValue();
  }

  /**
   * Check if asset is a cryptocurrency
   */
  isCrypto(): boolean {
    return this.cryptoDetails !== undefined;
  }

  /**
   * Check if asset is a precious metal
   */
  isPreciousMetal(): boolean {
    return this.metalDetails !== undefined;
  }

  /**
   * Get asset value (Open/Closed Principle - can be extended without modification)
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): IAsset {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      value: this.value,
      cryptoDetails: this.cryptoDetails,
      metalDetails: this.metalDetails,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Factory method to create Asset from JSON
   */
  static fromJSON(json: IAsset): Asset {
    const asset = new Asset(
      {
        name: json.name,
        type: json.type,
        value: json.value,
        cryptoDetails: json.cryptoDetails,
        metalDetails: json.metalDetails,
      },
      json.id
    );
    asset.createdAt = new Date(json.createdAt);
    asset.updatedAt = new Date(json.updatedAt);
    return asset;
  }
}