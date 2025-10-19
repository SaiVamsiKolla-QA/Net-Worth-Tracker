/**
 * Application Constants
 * 
 * What's in this file:
 * - Storage keys for LocalStorage
 * - Asset and Liability type arrays
 * - Crypto and Metal unit arrays
 * - Chart color palette
 * - Theme color definitions
 * - Projection period options
 * - Currency format settings
 * - Date format settings
 */

import { AssetType, LiabilityType, CryptoType, MetalUnit } from '../models/types';

// LocalStorage keys
export const STORAGE_KEYS = {
  PORTFOLIO: 'networth_portfolio',
  THEME: 'theme',
} as const;

// Type arrays for dropdowns
export const ASSET_TYPES = Object.values(AssetType);
export const LIABILITY_TYPES = Object.values(LiabilityType);
export const CRYPTO_TYPES = Object.values(CryptoType);
export const METAL_UNITS = Object.values(MetalUnit);

// Chart color palette
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
} as const;

// Theme colors (for reference)
export const THEME_COLORS = {
  light: {
    background: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb',
  },
  dark: {
    background: '#1f2937',
    text: '#f9fafb',
    border: '#374151',
  },
} as const;

// Projection periods (in months)
export const PROJECTION_MONTHS = [3, 6, 12, 24, 36, 60] as const;

// Currency format configuration
export const CURRENCY_FORMAT = {
  locale: 'en-CA',
  currency: 'CAD',
} as const;

// Date format options
export const DATE_FORMAT = {
  short: { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  } as Intl.DateTimeFormatOptions,
  long: { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  } as Intl.DateTimeFormatOptions,
} as const;