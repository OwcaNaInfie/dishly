import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import type { Recipe } from '../../models/Recipe';
import Button from '../Button/Button';
import Heading from '../Heading/Heading';

const RecipeDetails: React.FC = () => {
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
    <div className="w-full mx-auto p-6 border border-neutral">
      <Heading title={recipe.name} type="h1" />
      <p className="text-gray-500 text-lg mb-4">{recipe.category}</p>
      <p><strong>Opis:</strong> {recipe.description}</p>
      <p><strong>Czas przygotowania:</strong> {recipe.preparationTime} minut</p>
      <Heading type="h4" title="Instrukcje" />
      <p>{recipe.instructions}</p>

      {recipe.shoppingList && recipe.shoppingList.length > 0 && (
        <div className="mt-6">
          <Heading type="h4" title="Lista zakupów" />
          <ul className="space-y-3">

            {recipe.shoppingList.map((product, index) => (
              <li key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="bg-primary/20 text-primary flex items-center justify-center rounded-full p-1">
                <span className="icon-[tabler--arrow-right] size-4 rtl:rotate-180"></span>
              </span>
              <span className="text-base-content/80">{product.name} - {product.amount} {product.unit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <Button onClick={() => window.history.back()}>Wróć do listy przepisów</Button>
      </div>
    </div>
  );
};
export default RecipeDetails;