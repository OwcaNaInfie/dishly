import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import type { Recipe } from '../../models/Recipe';
import Button from '../Button/Button';

const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipes = useAppSelector((state) => state.recipes.recipes);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.id === id);
    setRecipe(foundRecipe || null);
  }, [id, recipes]);

  if (!recipe) {
    return <p className="text-center text-lg font-semibold">Nie znaleziono przepisu.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 border border-neutral rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
      <p className="text-gray-500 text-lg mb-4">Kategoria: {recipe.category}</p>
      
      <p className="text-base mb-4"><strong>Opis:</strong> {recipe.description}</p>
      
      <p className="text-base mb-4"><strong>Czas przygotowania:</strong> {recipe.preparationTime} minut</p>
      
      <h2 className="text-xl font-semibold mt-4">Instrukcje</h2>
      <p className="text-base mb-6">{recipe.instructions}</p>

      <p className="text-sm text-gray-500">
        {recipe.isRestricted ? "Ten przepis jest prywatny." : "Przepis jest publiczny."}
      </p>

      <div className="mt-6 flex justify-center">
        <Button onClick={() => window.history.back()}>Wróć</Button>
      </div>
    </div>
  );
};

export default Recipe;
