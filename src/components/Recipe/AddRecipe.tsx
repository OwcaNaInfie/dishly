// import React, { useState } from 'react';
// import { useRecipes } from '../../context/RecipeContext';
// import Button from '../Button/Button';

// const AddRecipe: React.FC = () => {
// 	const { addRecipe } = useRecipes();
// 	const [title, setTitle] = useState('');

// 	const handleAddRecipe = (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		addRecipe(title);
// 		setTitle('');
// 	};

// 	return (
// 		<form onSubmit={handleAddRecipe} className="add-recipe-form flex mb-8">
// 			<div className="w-96 mr-8">
// 				<label className="label label-text sr-only" htmlFor="hiddenLabel"> Full name </label>
// 				<input type="text" value={title}
// 					onChange={(e) => setTitle(e.target.value)} id="hiddenLabel" className="input input-lg" placeholder="Tytuł przepisu" />
// 			</div>
// 			<Button type="submit">Dodaj przepis</Button>
// 		</form>
// 	);
// };

// export default AddRecipe;

import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { addRecipe } from '../../features/recipeSlice';
import Button from '../Button/Button';

const AddRecipe: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');

  const handleAddRecipe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addRecipe(title));
    setTitle('');
  };

  return (
    <form onSubmit={handleAddRecipe} className="add-recipe-form flex mb-8">
      <div className="w-96 mr-8">
        <label className="label label-text sr-only" htmlFor="hiddenLabel"> Full name </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="hiddenLabel"
          className="input input-lg"
          placeholder="Tytuł przepisu"
        />
      </div>
      <Button type="submit">Dodaj przepis</Button>
    </form>
  );
};

export default AddRecipe;