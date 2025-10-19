/**
 * LocalStorage implementation of Repository pattern
 * Follows Interface Segregation Principle
 */

import { IRepository } from './IRepository';
import { IPortfolio } from '../models/types';

export class LocalStorageRepository implements IRepository {
  private readonly storageKey: string;

  constructor(storageKey: string = 'networth_portfolio') {
    this.storageKey = storageKey;
  }

  /**
   * Save portfolio to localStorage
   */
  async save(data: IPortfolio): Promise<void> {
    try {
      const jsonString = JSON.stringify(data);
      localStorage.setItem(this.storageKey, jsonString);
    } catch (error) {
      throw new Error(`Failed to save to localStorage: ${error}`);
    }
  }

  /**
   * Load portfolio from localStorage
   */
  async load(): Promise<IPortfolio | null> {
    try {
      const jsonString = localStorage.getItem(this.storageKey);
      if (!jsonString) return null;

      const data = JSON.parse(jsonString) as IPortfolio;
      return this.deserializeDates(data);
    } catch (error) {
      throw new Error(`Failed to load from localStorage: ${error}`);
    }
  }

  /**
   * Check if portfolio data exists
   */
  async exists(): Promise<boolean> {
    return localStorage.getItem(this.storageKey) !== null;
  }

  /**
   * Clear all portfolio data
   */
  async clear(): Promise<void> {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Export portfolio as JSON string
   */
  async export(): Promise<string> {
    const data = await this.load();
    if (!data) throw new Error('No data to export');

    return JSON.stringify(data, null, 2);
  }

  /**
   * Import portfolio from JSON string
   */
  async import(jsonString: string): Promise<IPortfolio> {
    try {
      const data = JSON.parse(jsonString) as IPortfolio;
      const deserializedData = this.deserializeDates(data);
      await this.save(deserializedData);
      return deserializedData;
    } catch (error) {
      throw new Error(`Failed to import data: ${error}`);
    }
  }

  /**
   * Helper method to deserialize date strings to Date objects
   */
  private deserializeDates(data: IPortfolio): IPortfolio {
    return {
      ...data,
      assets: data.assets.map((asset) => ({
        ...asset,
        createdAt: new Date(asset.createdAt),
        updatedAt: new Date(asset.updatedAt),
      })),
      liabilities: data.liabilities.map((liability) => ({
        ...liability,
        createdAt: new Date(liability.createdAt),
        updatedAt: new Date(liability.updatedAt),
      })),
      snapshots: data.snapshots.map((snapshot) => ({
        ...snapshot,
        date: new Date(snapshot.date),
        assets: snapshot.assets.map((asset) => ({
          ...asset,
          createdAt: new Date(asset.createdAt),
          updatedAt: new Date(asset.updatedAt),
        })),
        liabilities: snapshot.liabilities.map((liability) => ({
          ...liability,
          createdAt: new Date(liability.createdAt),
          updatedAt: new Date(liability.updatedAt),
        })),
      })),
    };
  }
}