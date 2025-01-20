import { createSlice } from '@reduxjs/toolkit';

type Recipe = {
  id: number;
  name: string;
  author: string;
  ingredients: { name: string; quantity: number }[];
};

type RecipesState = {
  recipes: Recipe[];
};

const initialState: RecipesState = {
  recipes: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
    removeRecipe: (state, action) => {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
    },
  },
});

export const { setRecipes, addRecipe, removeRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
