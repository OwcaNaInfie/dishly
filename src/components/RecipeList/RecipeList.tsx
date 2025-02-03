import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchRecipes, deleteRecipe } from '../../features/recipeSlice';
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading/Heading';
import { Recipe, RecipeCategory } from '../../models/Recipe';
import RecipeTile from '../Recipe/RecipeTile';

interface RecipeListProps {
  showRestricted?: boolean; // Określa, czy wyświetlać przepisy z isRestricted=true
  currentUserId?: string; // ID aktualnie zalogowanego użytkownika
  headingTitle: string
}

const RecipeList: React.FC<RecipeListProps> = ({ showRestricted = false, currentUserId, headingTitle }) => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes.recipes); // Pobierz przepisy ze stanu Redux
  const navigateTo = useNavigate();

  // Dodajemy stan na wybraną kategorię
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  // Filtrowanie przepisów na podstawie wybranej kategorii oraz isRestricted
  const filteredRecipes = recipes
    .filter((recipe) => {
      if (showRestricted) {
        // Wyświetlaj przepisy z isRestricted=true tylko dla currentUser
        return recipe.isRestricted && recipe.authorId === currentUserId;
      } else {
        // Wyświetlaj przepisy z isRestricted=false
        return !recipe.isRestricted;
      }
    })
    .filter((recipe) =>
      selectedCategory ? recipe.category === selectedCategory : true
    );

  // Funkcja do obsługi zmiany kategorii
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="home-container">
      <Heading type="h1" title={headingTitle} />
    
      {/* Dodajemy select do wyboru kategorii */}
      <div className="filter-container mb-6">
        <label htmlFor="category-select" className="mr-4">Filtruj po kategorii:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="select select-bordered"
        >
          <option value="">Wszystkie</option>
          {Object.entries(RecipeCategory).map(([key, value]) => (
            <option key={key} value={value}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="recipe-list flex flex-wrap gap-8">
        {filteredRecipes.length === 0 ? (
          <Heading type='h2' title="Brak wyników 😭"/>
        ) : (
          filteredRecipes.map((recipe: Recipe) => (
            <RecipeTile
              key={recipe.id}
              recipe={recipe}
              onView={() => navigateTo(`/recipe-details/${recipe.id}`)}
              onDelete={() => dispatch(deleteRecipe(recipe.id!))}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeList;