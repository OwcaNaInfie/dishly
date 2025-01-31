// features/recipes/recipesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Definiuj typ Recipe
export interface Recipe {
  id: string;
  title: string;
  category?: string;
  description?: string;
}

// Definiuj typ RecipesState
export interface RecipesState {
  recipes: Recipe[];
}

// Inicjalny stan
const initialState: RecipesState = {
  recipes: [],
};

// Twórz slice
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

// Eksportuj akcje
export const { addRecipeSuccess, deleteRecipeSuccess, setRecipes } = recipesSlice.actions;

// Eksportuj asynchroniczne akcje
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

export const addRecipe = (title: string): AppThunk => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, 'recipes'), { title });
    dispatch(addRecipeSuccess({ id: docRef.id, title }));
  } catch (error) {
    console.error('Error adding recipe: ', error);
  }
};

export const deleteRecipe = (id: string): AppThunk => async (dispatch) => {
  try {
    await deleteDoc(doc(db, 'recipes', id));
    dispatch(deleteRecipeSuccess(id));
  } catch (error) {
    console.error('Error deleting recipe: ', error);
  }
};

// Eksportuj reducer
export default recipesSlice.reducer;