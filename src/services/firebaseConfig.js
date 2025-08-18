import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {    
  apiKey: import.meta.env.VITE_YUNA_API_KEY,
  authDomain: import.meta.env.VITE_YUNA_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_YUNA_PROJECT_ID,
  storageBucket: import.meta.env.VITE_YUNA_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_YUNA_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_YUNA_APP_ID,
  measurementId: import.meta.env.VITE_YUNA_MEASUREMENT_ID || ''
};

// Validate that all required environment variables are loaded
const requiredEnvVars = ['VITE_YUNA_API_KEY', 'VITE_YUNA_AUTH_DOMAIN', 'VITE_YUNA_PROJECT_ID', 'VITE_YUNA_STORAGE_BUCKET', 'VITE_YUNA_MESSAGING_SENDER_ID', 'VITE_YUNA_APP_ID'];
const missingEnvVars = requiredEnvVars.filter(varName => !import.meta.env[varName] || import.meta.env[varName] === 'your-' + varName.toLowerCase().replace(/VITE_YUNA_|_/g, '-'));

if (missingEnvVars.length > 0) {
  console.warn('Warning: Missing or placeholder environment variables:', missingEnvVars.join(', '));
  console.warn('Please update your .env file with actual Firebase configuration values.');
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
