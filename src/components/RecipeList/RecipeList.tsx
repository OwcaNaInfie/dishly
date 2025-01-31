import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector, RootState } from '../../store'; // Użyj useAppDispatch i useAppSelector
import { fetchRecipes, deleteRecipe } from '../../features/recipeSlice'; // Import akcji
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import AddRecipe from '../Recipe/AddRecipe';
import { Recipe } from '../../features//recipeSlice'; // Import Recipe

const RecipeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state: RootState) => state.recipes.recipes); // Jawnie określ typ state
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className="home-container">
      <Heading type='h1' title='Przepisy' />
      <AddRecipe />
      <div className="recipe-list flex flex-wrap gap-8">
        {recipes.map((recipe: Recipe) => ( // Jawnie określ typ recipe
          <div key={recipe.id} className="card shadow-none border border-neutral rounded-none w-96 sm:max-w-sm">
            <div className="card-body">
              <h5 className="flex-1 card-title mb-0">{recipe.title}</h5>
              <div className="flex-2 text-base-content/50 mb-6 min-h-6">{recipe.category} </div>
              <p className="flex-3 mb-4">{recipe.description}</p>
              <div className="flex-1 card-actions justify-center lg:justify-start mt-auto">
                <Button onClick={() => navigateTo(`/recipe/${recipe.id}`)} className="">
                  Zobacz
                </Button>
                <Button
                  className='btn btn-text btn-error'
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteRecipe(recipe.id));
                  }}
                >
                  Usuń przepis
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
