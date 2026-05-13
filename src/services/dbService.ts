import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  onSnapshot,
  serverTimestamp,
  increment,
  type DocumentData
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase.ts';
import { Song, UserProfile, Language } from '../types.ts';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const dbService = {
  // User Profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${userId}`);
      return null;
    }
  },

  async createUserProfile(profile: Partial<UserProfile>): Promise<void> {
    if (!profile.uid) return;
    try {
      await setDoc(doc(db, 'users', profile.uid), {
        ...profile,
        createdAt: serverTimestamp(),
        lastActiveAt: serverTimestamp(),
        isAdmin: false,
        isPremium: false,
        raiTokens: 0,
        totalListenMinutes: 0,
        selectedGenres: [],
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${profile.uid}`);
    }
  },

  // Songs
  async getSongs(): Promise<Song[]> {
    try {
      const q = query(collection(db, 'songs'), where('isActive', '==', true));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Song));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'songs');
      return [];
    }
  },

  async addSong(song: Omit<Song, 'id'>): Promise<string> {
    try {
      const newDocRef = doc(collection(db, 'songs'));
      await setDoc(newDocRef, {
        ...song,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        playCount: 0,
        skipCount: 0,
        avgListenDuration: 0,
      });
      return newDocRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'songs');
      return '';
    }
  },

  async incrementPlayCount(songId: string): Promise<void> {
    try {
      const docRef = doc(db, 'songs', songId);
      await updateDoc(docRef, {
        playCount: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `songs/${songId}`);
    }
  }
};
