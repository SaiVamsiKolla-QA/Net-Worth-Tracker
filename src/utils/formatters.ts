/**
 * Utility functions for formatting values
 * 
 * What's in this file:
 * - Currency formatting ($1,234.56)
 * - Compact currency ($1.2K, $3.5M)
 * - Percentage formatting (25.5%)
 * - Date formatting (short and long)
 * - Number formatting with commas
 * - Percentage change calculation
 * - Relative time formatting (2 days ago, in 3 months)
 */

import { CURRENCY_FORMAT, DATE_FORMAT } from './constants';

/**
 * Format number as Canadian currency
 * Example: 1234.56 → "$1,234.56"
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(CURRENCY_FORMAT.locale, {
    style: 'currency',
    currency: CURRENCY_FORMAT.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format number as compact currency (e.g., $1.2K, $3.5M)
 * Example: 1200 → "$1.2K", 3500000 → "$3.5M"
 */
export const formatCompactCurrency = (amount: number): string => {
  return new Intl.NumberFormat(CURRENCY_FORMAT.locale, {
    style: 'currency',
    currency: CURRENCY_FORMAT.currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
};

/**
 * Format percentage with specified decimal places
 * Example: formatPercentage(25.567, 1) → "25.6%"
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format date in short format
 * Example: new Date('2024-01-15') → "Jan 15, 2024"
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat(CURRENCY_FORMAT.locale, DATE_FORMAT.short).format(date);
};

/**
 * Format date in long format
 * Example: new Date('2024-01-15') → "January 15, 2024"
 */
export const formatDateLong = (date: Date): string => {
  return new Intl.DateTimeFormat(CURRENCY_FORMAT.locale, DATE_FORMAT.long).format(date);
};

/**
 * Format large numbers with commas
 * Example: 1234567 → "1,234,567"
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat(CURRENCY_FORMAT.locale).format(num);
};

/**
 * Calculate percentage change between two values
 * Example: calculatePercentageChange(100, 150) → 50 (50% increase)
 */
export const calculatePercentageChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return newValue === 0 ? 0 : 100;
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
};

/**
 * Format relative time (e.g., "2 days ago", "in 3 months")
 * Example: formatRelativeTime(yesterday) → "1 day ago"
 */
export const formatRelativeTime = (date: Date): string => {
  const rtf = new Intl.RelativeTimeFormat(CURRENCY_FORMAT.locale, { numeric: 'auto' });
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffInDays) < 7) {
    return rtf.format(diffInDays, 'day');
  } else if (Math.abs(diffInDays) < 30) {
    return rtf.format(Math.round(diffInDays / 7), 'week');
  } else if (Math.abs(diffInDays) < 365) {
    return rtf.format(Math.round(diffInDays / 30), 'month');
  } else {
    return rtf.format(Math.round(diffInDays / 365), 'year');
  }
};