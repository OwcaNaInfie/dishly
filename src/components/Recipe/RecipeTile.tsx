import React from 'react';
import Button from '../Button/Button';
import type { Recipe } from '../../models/Recipe'; // Import modelu Recipe
import { auth } from '../../firebaseConfig';
interface RecipeTileProps {
  recipe: Recipe;
  onView: () => void;
  onDelete: () => void;
}

const RecipeTile: React.FC<RecipeTileProps> = ({ recipe, onView, onDelete }) => {
  const isOwner = recipe.authorId === auth.currentUser?.uid; // Sprawdź, czy to jego przepis

  return (
    <div className="card shadow-none border border-neutral rounded-none w-96 sm:max-w-sm">
      <div className="card-body">
        <h5 className="card-title mb-0">{recipe.name}</h5>
        <div className="flex-2 text-base-content/50 mb-6 min-h-6">{recipe.category}</div>
        <p className="flex-3 mb-4">{recipe.description}</p>
        <div className="card-actions justify-start mt-auto">
          <Button onClick={onView}>Zobacz</Button>

          {isOwner && (
            <Button
              className="btn btn-text btn-error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              Usuń przepis
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeTile;

