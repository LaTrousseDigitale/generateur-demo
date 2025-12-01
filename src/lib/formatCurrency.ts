/**
 * Utility functions for formatting currency in CAD (Canadian dollars)
 * with French-Canadian locale
 */

/**
 * Format a number as CAD currency
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted string like "1 234,56 $" or "1 234 $"
 */
export const formatCAD = (
  amount: number,
  options?: {
    showDecimals?: boolean;
    compact?: boolean;
  }
): string => {
  const { showDecimals = false, compact = false } = options || {};

  if (compact && amount >= 1000) {
    return `${(amount / 1000).toLocaleString('fr-CA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })}k $`;
  }

  return `${amount.toLocaleString('fr-CA', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  })} $`;
};

/**
 * Format a number as CAD currency using Intl.NumberFormat
 * Returns format like "1 234,56 $ CA"
 */
export const formatCADFull = (amount: number): string => {
  return amount.toLocaleString('fr-CA', {
    style: 'currency',
    currency: 'CAD',
  });
};

/**
 * Format price with /mois suffix
 */
export const formatCADPerMonth = (amount: number): string => {
  return `${formatCAD(amount)}/mois`;
};

/**
 * Format price with /an suffix
 */
export const formatCADPerYear = (amount: number): string => {
  return `${formatCAD(amount)}/an`;
};
