
// src/lib/firebase-admin.ts
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    if (!serviceAccountJson) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable is not set.');
    }
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
     console.log('Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization error:', error.message);
    // Optionally, throw the error or handle it to prevent app startup if Firebase Admin is critical
    // throw new Error('Failed to initialize Firebase Admin SDK: ' + error.message);
  }
}

export const db = admin.firestore();
export const adminAuth = admin.auth(); // if needed later
