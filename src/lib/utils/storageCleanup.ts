/**
 * Storage cleanup utilities for removing deprecated storage keys
 */

import { STORAGE_KEYS } from '@/lib/types/progress';

/**
 * Remove all deprecated storage keys from localStorage
 */
export function cleanupDeprecatedStorageKeys(): void {
  if (typeof localStorage === 'undefined') {
    console.warn('localStorage is not available, cannot cleanup deprecated keys');
    return;
  }

  const removedKeys: string[] = [];

  try {
    // Remove legacy mastery data
    if (localStorage.getItem(STORAGE_KEYS.MASTERY_DATA)) {
      localStorage.removeItem(STORAGE_KEYS.MASTERY_DATA);
      removedKeys.push(STORAGE_KEYS.MASTERY_DATA);
    }

    // Remove old migration key
    if (localStorage.getItem(STORAGE_KEYS.OLD_MIGRATION_KEY)) {
      localStorage.removeItem(STORAGE_KEYS.OLD_MIGRATION_KEY);
      removedKeys.push(STORAGE_KEYS.OLD_MIGRATION_KEY);
    }

    // Remove all step input and status keys
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.startsWith(STORAGE_KEYS.STEP_INPUTS_PREFIX) || 
          key.startsWith(STORAGE_KEYS.STEP_STATUSES_PREFIX)) {
        localStorage.removeItem(key);
        removedKeys.push(key);
      }
    });

    console.log(`Cleanup completed. Removed ${removedKeys.length} deprecated keys:`, removedKeys);
  } catch (error) {
    console.error('Error during storage cleanup:', error);
  }
}

/**
 * Get list of deprecated storage keys that exist
 */
export function getDeprecatedStorageKeys(): string[] {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  const deprecatedKeys: string[] = [];

  try {
    // Check for legacy mastery data
    if (localStorage.getItem(STORAGE_KEYS.MASTERY_DATA)) {
      deprecatedKeys.push(STORAGE_KEYS.MASTERY_DATA);
    }

    // Check for old migration key
    if (localStorage.getItem(STORAGE_KEYS.OLD_MIGRATION_KEY)) {
      deprecatedKeys.push(STORAGE_KEYS.OLD_MIGRATION_KEY);
    }

    // Check for step data keys
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.startsWith(STORAGE_KEYS.STEP_INPUTS_PREFIX) || 
          key.startsWith(STORAGE_KEYS.STEP_STATUSES_PREFIX)) {
        deprecatedKeys.push(key);
      }
    });
  } catch (error) {
    console.error('Error checking for deprecated storage keys:', error);
  }

  return deprecatedKeys;
}

/**
 * Check if migration from old storage format is needed
 */
export function needsMigration(): boolean {
  if (typeof localStorage === 'undefined') {
    return false;
  }

  try {
    // Check if new unified progress data exists
    const unifiedData = localStorage.getItem(STORAGE_KEYS.UNIFIED_PROGRESS);
    if (unifiedData) {
      return false; // Already migrated
    }

    // Check if any old data exists
    const deprecatedKeys = getDeprecatedStorageKeys();
    return deprecatedKeys.length > 0;
  } catch (error) {
    console.error('Error checking migration status:', error);
    return false;
  }
}

/**
 * Get storage usage information
 */
export function getStorageUsageInfo(): {
  unified: number;
  deprecated: number;
  total: number;
  deprecatedKeys: string[];
} {
  if (typeof localStorage === 'undefined') {
    return {
      unified: 0,
      deprecated: 0,
      total: 0,
      deprecatedKeys: []
    };
  }

  try {
    const deprecatedKeys = getDeprecatedStorageKeys();
    
    // Calculate sizes
    const unifiedData = localStorage.getItem(STORAGE_KEYS.UNIFIED_PROGRESS);
    const unifiedSize = unifiedData ? new Blob([unifiedData]).size : 0;
    
    let deprecatedSize = 0;
    deprecatedKeys.forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        deprecatedSize += new Blob([data]).size;
      }
    });

    // Calculate total localStorage usage
    let totalSize = 0;
    for (let key in localStorage) {
      const data = localStorage.getItem(key);
      if (data) {
        totalSize += new Blob([data]).size;
      }
    }

    return {
      unified: unifiedSize,
      deprecated: deprecatedSize,
      total: totalSize,
      deprecatedKeys
    };
  } catch (error) {
    console.error('Error calculating storage usage:', error);
    return {
      unified: 0,
      deprecated: 0,
      total: 0,
      deprecatedKeys: []
    };
  }
}

/**
 * Helper function to format bytes for display
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}