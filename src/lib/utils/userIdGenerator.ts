// Utility for generating and managing anonymous user IDs
import { v4 as uuidv4 } from 'uuid';

const USER_ID_STORAGE_KEY = 'fm-anonymous-user-id';

/**
 * Generates a unique anonymous user ID and persists it
 * Returns the same ID on subsequent calls
 */
export function getOrCreateAnonymousUserId(): string {
  // Check if we already have a stored user ID
  if (typeof window !== 'undefined') {
    const existingId = localStorage.getItem(USER_ID_STORAGE_KEY);
    if (existingId) {
      return existingId;
    }
  }

  // Generate a new unique ID
  const newUserId = `anon_${uuidv4().replace(/-/g, '')}`;
  
  // Store it for future use
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_ID_STORAGE_KEY, newUserId);
  }
  
  return newUserId;
}

/**
 * Gets the current anonymous user ID without creating a new one
 * Returns null if no ID exists
 */
export function getCurrentAnonymousUserId(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(USER_ID_STORAGE_KEY);
  }
  return null;
}

/**
 * Clears the current anonymous user ID (useful for testing or resetting)
 */
export function clearAnonymousUserId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_ID_STORAGE_KEY);
  }
}