import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously,
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from './firebaseConfig.js';

// --- Authentication Functions ---

// Sign in anonymously
export function signInAnonymous() {
  return signInAnonymously(auth)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Anonymous user signed in:", user.uid);
      return { 
        success: true, 
        user: { 
          uid: user.uid, 
          email: null,
          isAnonymous: true,
          displayName: "Anonymous User"
        } 
      };
    })
    .catch((error) => {
      console.error("Anonymous login failed:", error.code, error.message);
      return { success: false, error: { code: error.code, message: error.message } };
    });
}

// Sign in with email and password
export function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user.uid);
      return { 
        success: true, 
        user: { 
          uid: user.uid, 
          email: user.email,
          isAnonymous: false,
          displayName: user.email
        } 
      };
    })
    .catch((error) => {
      console.error("Login failed:", error.code, error.message);
      return { success: false, error: { code: error.code, message: error.message } };
    });
}

// Create a new user account
export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created:", user.uid);
      return { 
        success: true, 
        user: { 
          uid: user.uid, 
          email: user.email,
          isAnonymous: false,
          displayName: user.email
        } 
      };
    })
    .catch((error) => {
      console.error("Registration failed:", error.code, error.message);
      return { success: false, error: { code: error.code, message: error.message } };
    });
}

// Sign out the current user
export function signOutUser() {
  return signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
      return { success: true };
    })
    .catch((error) => {
      console.error("Sign out failed:", error);
      return { success: false, error: error.message };
    });
}

// Get the current user
export function getCurrentUser() {
  const user = auth.currentUser;
  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      isAnonymous: user.isAnonymous,
      displayName: user.isAnonymous ? "Anonymous User" : user.email
    };
  }
  return null;
}

// Listen for authentication state changes
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        isSignedIn: true,
        user: {
          uid: user.uid,
          email: user.email,
          isAnonymous: user.isAnonymous,
          displayName: user.isAnonymous ? "Anonymous User" : user.email
        }
      });
    } else {
      callback({
        isSignedIn: false,
        user: null
      });
    }
  });
}
