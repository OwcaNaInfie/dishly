import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { User } from '../models/User';
import userStore from '../stores/UserStore';

const COLLECTION_NAME = 'users';

// Pobierz dane użytkownika
export const fetchUser = async (userId: string) => {
  const userDoc = await getDoc(doc(db, COLLECTION_NAME, userId));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const user = new User(
      userData.id,
      userData.username,
      userData.name,
      userData.surname,
      userData.email,
      userData.telephone,
      userData.favoriteRecipes || [],
      userData.myRecipes || [],
      userData.shoppingLists || []
    );
    userStore.setUser(user);
  } else {
    console.error('Użytkownik nie istnieje.');
  }
};

// Aktualizuj dane użytkownika
export const updateUser = async (userId: string, updatedData: Partial<User>) => {
  const userRef = doc(db, COLLECTION_NAME, userId);
  await setDoc(userRef, updatedData, { merge: true });
  userStore.updateUser(updatedData);
};
