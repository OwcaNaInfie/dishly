import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store';
import { deleteRecipe } from '../../features/recipeSlice';
import type { Recipe } from '../../models/Recipe';
import Button from '../Button/Button';
import Heading from '../Heading/Heading';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recipes = useAppSelector((state) => state.recipes.recipes);
  const uid = useAppSelector((state) => state.auth.user?.uid); // Pobranie ID zalogowanego użytkownika

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.id === id);
    setRecipe(foundRecipe || null);
  }, [id, recipes]);

  const handleDelete = () => {
    if (recipe && window.confirm('Czy na pewno chcesz usunąć ten przepis?')) {
      dispatch(deleteRecipe(recipe.id!));
      navigate('/recipes'); // Przekierowanie po usunięciu
    }
  };

  if (!recipe) {
    return <p className="text-center text-lg font-semibold">Nie znaleziono przepisu.</p>;
  }

  return (
    <div className="w-full mx-auto p-6 border border-neutral">
      <Heading title={recipe.name} type="h1" />
      <p className="text-gray-500 text-lg mb-4">{recipe.category}</p>
      
      <p><strong>Opis:</strong> {recipe.description}</p>
      
      <p><strong>Czas przygotowania:</strong> {recipe.preparationTime} minut</p>
      
      <Heading type="h4" title="Instrukcje" />
      <p>{recipe.instructions}</p>

      <p className="text-sm text-gray-500">
        {recipe.isRestricted ? 'Ten przepis jest prywatny.' : 'Przepis jest publiczny.'}
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <Button onClick={() => window.history.back()}>Wróć</Button>
        {recipe.authorId === uid && ( // Sprawdzenie, czy użytkownik jest autorem
          <Button onClick={handleDelete} className="btn btn-error">
            Usuń przepis
          </Button>
        )}
      </div>

    </div>
  );
};

export default RecipeDetails;
