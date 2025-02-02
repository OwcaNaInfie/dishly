import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchRecipes, deleteRecipe } from '../../features/recipeSlice';
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading/Heading';
import AddRecipe from '../Recipe/AddRecipe';
import { Recipe } from '../../models/Recipe'; // Import modelu Recipe
import RecipeTile from '../Recipe/RecipeTile'; // Import komponentu Recipe

const RecipeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes.recipes); // Pobierz przepisy ze stanu Redux
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(fetchRecipes()); // Pobierz przepisy podczas montowania komponentu
  }, [dispatch]);

  return (
    <div className="home-container">
      <Heading type='h1' title='Przepisy' />
      <AddRecipe />
      <div className="recipe-list flex flex-wrap gap-8">
        {recipes.map((recipe: Recipe) => (
          <RecipeTile
            key={recipe.id}
            recipe={recipe}
            onView={() => navigateTo(`/recipe/${recipe.id}`)}
            onDelete={() => dispatch(deleteRecipe(recipe.id!))}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;