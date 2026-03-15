import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Only init if config is present
const app = firebaseConfig.apiKey && getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0] || null

let analyticsPromise: Promise<Analytics | null> | null = null

export function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (!app) return Promise.resolve(null)
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (!analyticsPromise) {
    analyticsPromise = isSupported().then(ok => ok ? getAnalytics(app) : null).catch(() => null)
  }
  return analyticsPromise
}

export { app }
