// Firebase configuration for Focused Mastery application
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-MEASUREMENT',
};

// Check if Firebase is properly configured
const isFirebaseConfigured = !!(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

// Initialize Firebase only if it hasn't been initialized yet and is properly configured
let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  // Initialize Firestore
  db = getFirestore(app);
} else {
  console.warn('Firebase not configured - using localStorage fallback');
}

// Connect to emulators in development (optional)
if (isFirebaseConfigured && 
    process.env.NODE_ENV === 'development' && 
    process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
  
  // Track emulator connection state to avoid duplicate connections
  let firestoreEmulatorConnected = false;
  
  try {
    // Connect Firestore emulator
    if (db && !firestoreEmulatorConnected) {
      connectFirestoreEmulator(db, 'localhost', 8080);
      firestoreEmulatorConnected = true;
      console.log('Connected to Firestore emulator');
    }
  } catch (error: any) {
    if (error.code === 'firestore/emulator-config-failed') {
      console.log('Firestore emulator already connected');
    } else {
      console.warn('Failed to connect to Firestore emulator:', error.message);
    }
  }
}

// Helper function for safe Firebase operations
export const withFirebaseErrorHandling = async <T>(
  operation: () => Promise<T>,
  fallback: T,
  operationName: string = 'Firebase operation'
): Promise<T> => {
  if (!isFirebaseConfigured || !db) {
    console.warn(`${operationName} skipped - Firebase not configured`);
    return fallback;
  }

  try {
    return await operation();
  } catch (error) {
    console.error(`${operationName} failed:`, error);
    return fallback;
  }
};

// Helper to check if Firebase is available and ready
export const isFirebaseReady = (): boolean => {
  return isFirebaseConfigured && db !== null;
};

export { db, isFirebaseConfigured };
export default app;