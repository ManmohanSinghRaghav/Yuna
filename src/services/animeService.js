import { db } from './firebaseConfig.js';
import { collection, addDoc, query, where, getDocs, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { getCurrentUser } from './authService.js';

// Helper function to get current user ID
function getCurrentUserId() {
  const user = getCurrentUser();
  return user ? user.uid : null;
}

// Add an anime to the user's list
export async function addAnimeToList(userId, animeData) {
  try {
    const docRef = await addDoc(collection(db, 'animeListings'), {
      userId,
      id: animeData.id,
      title: animeData.title,
      imageUrl: animeData.imageUrl,
      episodesWatched: 0,
      status: 'Not Watched',
      notes: ''
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding anime:', error);
    return { success: false, error: error.message };
  }
}

// Retrieve a user's anime list
export async function getUserAnimeList(userId) {
  try {
    const q = query(collection(db, 'animeListings'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const animeList = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
    return { success: true, data: animeList };
  } catch (error) {
    console.error('Error fetching anime list:', error);
    return { success: false, error: error.message };
  }
}

// Subscribe to real-time updates for a user's anime list
export function subscribeToAnimeList(userId, callback) {
  const q = query(collection(db, 'animeListings'), where('userId', '==', userId));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const animeList = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
    callback(animeList);
  }, (error) => {
    console.error('Error in real-time subscription:', error);
    callback(null, error);
  });
  return unsubscribe;
}

// Update an anime entry
export async function updateAnimeEntry(docId, updates) {
  try {
    const animeRef = doc(db, 'animeListings', docId);
    await updateDoc(animeRef, updates);
    return { success: true };
  } catch (error) {
    console.error('Error updating anime:', error);
    return { success: false, error: error.message };
  }
}

// Delete an anime entry
export async function deleteAnimeEntry(docId) {
  try {
    const animeRef = doc(db, 'animeListings', docId);
    await deleteDoc(animeRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting anime:', error);
    return { success: false, error: error.message };
  }
}

// --- Authentication-aware functions ---
// These functions automatically use the current authenticated user

// Add anime for the currently authenticated user
export async function addAnimeForCurrentUser(animeData) {
  const userId = getCurrentUserId();
  if (!userId) {
    return { success: false, error: 'User not authenticated' };
  }
  return addAnimeToList(userId, animeData);
}

// Get anime list for the currently authenticated user
export async function getCurrentUserAnimeList() {
  const userId = getCurrentUserId();
  if (!userId) {
    return { success: false, error: 'User not authenticated' };
  }
  return getUserAnimeList(userId);
}

// Subscribe to the currently authenticated user's anime list
export function subscribeToCurrentUserAnimeList(callback) {
  const userId = getCurrentUserId();
  if (!userId) {
    callback(null, { message: 'User not authenticated' });
    return () => {}; // Return empty unsubscribe function
  }
  return subscribeToAnimeList(userId, callback);
}
