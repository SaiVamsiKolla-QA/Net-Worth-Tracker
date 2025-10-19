import { IPortfolio } from '../models/types';

/**
 * Repository interface - Dependency Inversion Principle
 * High-level modules depend on abstractions, not concrete implementations
 */
export interface IRepository {
  /**
   * Save portfolio data
   */
  save(data: IPortfolio): Promise<void>;

  /**
   * Load portfolio data
   */
  load(): Promise<IPortfolio | null>;

  /**
   * Check if data exists
   */
  exists(): Promise<boolean>;

  /**
   * Clear all data
   */
  clear(): Promise<void>;

  /**
   * Export data as JSON string
   */
  export(): Promise<string>;

  /**
   * Import data from JSON string
   */
  import(jsonString: string): Promise<IPortfolio>;
}