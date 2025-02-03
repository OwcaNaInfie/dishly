import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { User } from '../models/User';

export interface ProfileState {
  user: User | null;
}

const initialState: ProfileState = {
  user: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    updateUserSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    deleteUserSuccess(state) {
      state.user = null; // Ustawiamy user na null po usunięciu
    },
  },
});

export const { setUser, updateUserSuccess, deleteUserSuccess } = profileSlice.actions;

// Pobierz dane użytkownika z Firestore
export const fetchUser = (userId: string): AppThunk => async (dispatch) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      dispatch(setUser({ ...userData, id: userId, uid: userId }));
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user: ', error);
  }
};

// Zaktualizuj dane użytkownika w Firestore
export const updateUser = (user: User): AppThunk => async (dispatch) => {
  try {
    const updatedUser = { 
      ...user, 
      displayName: `${user.name} ${user.surname}` // 🔥 Automatyczna aktualizacja displayName
    };

    console.log("Updating user: ", user);
    await setDoc(doc(db, 'users', user.id), user, { merge: true });

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: updatedUser.displayName });
    }

    dispatch(updateUserSuccess(updatedUser));
  } catch (error) {
    console.error('Error updating user: ', error);
  }
};

export const deleteUser = (userId: string): AppThunk => async (dispatch) => {
  try {
    // Pobierz przepisy użytkownika na podstawie jego ID (authorId)
    const recipesQuery = query(collection(db, 'recipes'), where('authorId', '==', userId));
    const querySnapshot = await getDocs(recipesQuery);
    
    // Usuń wszystkie przepisy powiązane z użytkownikiem
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, 'recipes', docSnapshot.id));
    });

    // Teraz usuń użytkownika
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef); // Usuń dokument użytkownika z kolekcji users

    // Dispatch action do Redux
    dispatch(deleteUserSuccess()); // Nie przekazuj userId, ponieważ już go usunęliśmy
  } catch (error) {
    console.error('Error deleting user and their recipes: ', error);
  }
};

export default profileSlice.reducer;
