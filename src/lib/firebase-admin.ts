
// src/lib/firebase-admin.ts
import admin from 'firebase-admin';

if (!admin.apps.length) {
  console.log('Attempting to initialize Firebase Admin SDK...');
  try {
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    if (!serviceAccountJson) {
      console.error('Firebase Admin Init Error: GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable is not set or empty.');
      // We throw here to ensure the execution stops if credentials aren't found,
      // preventing db from being used uninitialized.
      throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable is not set or empty.');
    }
    console.log('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable found.');

    let serviceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountJson);
      console.log('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS parsed successfully.');
    } catch (parseError: any) {
      console.error('Firebase Admin Init Error: Failed to parse GOOGLE_SERVICE_ACCOUNT_CREDENTIALS JSON. Ensure it is valid JSON. Error:', parseError.message);
      throw new Error('Failed to parse GOOGLE_SERVICE_ACCOUNT_CREDENTIALS JSON: ' + parseError.message);
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // Optionally, specify your project ID if it's not picked up automatically,
      // though usually the service account key contains this.
      // projectId: 'your-firebase-project-id',
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    // This will catch errors from JSON.parse, new Error throws, or admin.initializeApp
    console.error('CRITICAL: Firebase Admin SDK failed to initialize. Firestore operations will fail. Error:', error.message);
    // Depending on how critical Firebase is, you might re-throw or handle appropriately.
    // For this app, Firestore is critical for /api/access.
  }
} else {
  console.log('Firebase Admin SDK already initialized.');
}

// Export db. If initialization failed above, using db will likely result in further errors.
// This is okay as it will make the failure point clear in the logs when db is accessed.
export const db = admin.firestore();
export const adminAuth = admin.auth(); // if needed later
