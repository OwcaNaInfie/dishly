// features/recipes/recipesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { updateDoc, arrayUnion, addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Recipe } from '../models/Recipe'; // Import modelu Recipe

export interface RecipesState {
  recipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipeSuccess(state, action: PayloadAction<Recipe>) {
      state.recipes.push(action.payload);
    },
    deleteRecipeSuccess(state, action: PayloadAction<string>) {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
    },
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
    },
  },
});

export const { addRecipeSuccess, deleteRecipeSuccess, setRecipes } = recipesSlice.actions;

// Pobierz przepisy z Firestore
export const fetchRecipes = (): AppThunk => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    const recipes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[];
    dispatch(setRecipes(recipes));
  } catch (error) {
    console.error('Error fetching recipes: ', error);
  }
};

// Dodaj przepis do Firestore i aktualizuj listę myRecipes użytkownika
export const addRecipe = (recipe: Omit<Recipe, 'id'>): AppThunk => async (dispatch) => {
  try {
    // Dodaj przepis do kolekcji "recipes"
    const docRef = await addDoc(collection(db, 'recipes'), recipe);

    // Dodaj identyfikator przepisu do listy myRecipes użytkownika
    const userRef = doc(db, 'users', recipe.authorId); // Pobierz dokument użytkownika
    await updateDoc(userRef, {
      myRecipes: arrayUnion(docRef.id), // Dodaj id przepisu do myRecipes
    });

    // Dispatch action do Redux
    dispatch(addRecipeSuccess({ id: docRef.id, ...recipe }));

  } catch (error) {
    console.error('Error adding recipe: ', error);
  }
};

// Usuń przepis z Firestore
export const deleteRecipe = (id: string): AppThunk => async (dispatch) => {
  try {
    await deleteDoc(doc(db, 'recipes', id));
    dispatch(deleteRecipeSuccess(id));
  } catch (error) {
    console.error('Error deleting recipe: ', error);
  }
};

export default recipesSlice.reducer;