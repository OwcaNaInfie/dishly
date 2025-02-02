import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db, googleAuthProvider } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { setUser, setLoading, setError } from './authSlice';
import { FirebaseError } from 'firebase/app';
import { User } from '../../models/User'

// Rejestracja użytkownika
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name, surname, photoURL, bio, telephone }: { 
    email: string; 
    password: string;
    name: string;
    surname: string;
    photoURL: string;
    bio: string;
    telephone: string;
  }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Zapisz dane użytkownika w Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name,
        surname,
        displayName: `${name} ${surname}`,
        photoURL,
        bio,
        telephone,
        createdAt: new Date().toISOString(),
      });

      const newUser: User = {
        id: user.uid,
        uid: user.uid,
        username: user.email || '',
        name,
        surname,
        password,
        displayName: `${name} ${surname}`,
        photoURL,
        bio,
        email: user.email || '',
        telephone,
        myRecipes: [],
      };

      dispatch(setUser(newUser));
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('Wystąpił nieznany błąd.'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Logowanie użytkownika
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Pobierz dane użytkownika z Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const user: User = {
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          username: firebaseUser.email || '',
          name: userData.name,
          surname: userData.surname,
          password: userData.password,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          bio: userData.bio,
          email: firebaseUser.email || '',
          telephone: userData.telephone,
          myRecipes: userData.myRecipes || [],
        };
        dispatch(setUser(user));
      } else {
        dispatch(setError('Dane użytkownika nie zostały znalezione.'));
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('Wystąpił nieznany błąd.'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Logowanie przez Google
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      const firebaseUser = userCredential.user;

      // Sprawdź, czy użytkownik już istnieje w Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

      if (!userDoc.exists()) {
        // Jeśli użytkownik nie istnieje, zapisz jego dane w Firestore
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
          createdAt: new Date().toISOString(),
          name: '',
          surname: '',
          bio: '',
          telephone: '',
          myRecipes: [],
        });
      }

      const userData = userDoc.data();
      const user: User = {
        id: firebaseUser.uid,
        uid: firebaseUser.uid,
        username: firebaseUser.email || '',
        name: userData?.name || '',
        surname: userData?.surname || '',
        password: userData?.password || '',
        displayName: userData?.displayName || firebaseUser.displayName || '',
        photoURL: userData?.photoURL || '',
        bio: userData?.bio || '',
        email: firebaseUser.email || '',
        telephone: userData?.telephone || '',
        myRecipes: userData?.myRecipes || [],
      };

      dispatch(setUser(user));
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('Wystąpił nieznany błąd.'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }
);