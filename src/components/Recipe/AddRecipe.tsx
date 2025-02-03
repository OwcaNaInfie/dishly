// import React, { useState, useEffect } from 'react';
// import { useAppDispatch } from '../../store';
// import { auth } from '../../firebaseConfig';
// import { addRecipe } from '../../features/recipeSlice';
// import Button from '../Button/Button';
// import { RecipeCategory } from '../../models/Recipe';
// import { Notyf } from 'notyf';
// import { useNavigate } from 'react-router-dom'

// // Create an instance of Notyf
// const notyf = new Notyf();

// const AddRecipe: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [preparationTime, setPreparationTime] = useState('');
//   const [instructions, setInstructions] = useState('');
//   const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.BREAKFAST);
//   const [isRestricted, setIsRestricted] = useState(false);

//   const navigateTo = useNavigate()
  
//   useEffect(() => {
//     // Inicjalizacja FlyonUI Dropdown
//     window.HSStaticMethods.autoInit(["dropdown"]);
//   }, []);

//   const handleAddRecipe = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Pobierz uid aktualnego użytkownika
//     const user = auth.currentUser;
//     if (!user) {
//       alert('Musisz być zalogowany, aby dodać przepis.');
//       return;
//     }

//     const newRecipe = {
//       authorId: user.uid, // Użyj uid użytkownika
//       name,
//       description,
//       preparationTime,
//       instructions,
//       category,
//       isRestricted,
//     };

//     dispatch(addRecipe(newRecipe));

//     // Wyczyść formularz
//     setName('');
//     setDescription('');
//     setPreparationTime('');
//     setInstructions('');
//     setCategory(RecipeCategory.BREAKFAST);
//     setIsRestricted(false);

//     notyf.success('Przepis został dodany');

//     setTimeout(() => {
//         navigateTo("/");
//     }, 3000);

//   };

//   const handleCategorySelect = (selectedCategory: RecipeCategory) => {
//     setCategory(selectedCategory);
//   };

//   return (
//         <form onSubmit={handleAddRecipe} className='card-body flex flex-col justify-between gap-y-6 border border-neutral mb-4'>
//           <div className="relative w-96 mx-auto">
//             <label className="label label-text" htmlFor="name">
//               Nazwa przepisu
//             </label>
//             <input
//               required
//               maxLength={45}
//               type="text"
//               className="input"
//               id="name"
//               placeholder="Nazwij swój przepis."
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className="relative w-96 mx-auto">
//             <label className="label label-text" htmlFor="description">
//               Opis
//             </label>
//             <textarea
//               required
//               maxLength={130}
//               className="textarea"
//               placeholder="Opisz krótko swój przepis."
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>
//           </div>

//           <div className="relative w-96 mx-auto">
//             <label className="label label-text" htmlFor="preparationTime">
//               Czas przygotowania
//             </label>
//             <input
//               required
//               type="text"
//               className="input"
//               id="preparationTime"
//               placeholder="Czas przygotowania (w minutach)."
//               value={preparationTime}
//               onChange={(e) => setPreparationTime(e.target.value)}
//             />
//           </div>

//           <div className="relative w-96 mx-auto">
//             <label className="label label-text" htmlFor="instructions">
//               Instrukcje
//             </label>
//             <textarea
//               required
//               className="textarea"
//               placeholder="Tutaj rozpisz kroki przygotowania posiłku."
//               value={instructions}
//               id='instructions'
//               onChange={(e) => setInstructions(e.target.value)}
//             ></textarea>
//           </div>

//           <div className="w-96 mx-auto dropdown relative inline-flex rtl:[--placement:bottom-end]">
//             <Button
//               id="category"
//               type="button"
//               className="w-96 dropdown-toggle btn btn-soft"
//               aria-haspopup="menu"
//               aria-expanded="false"
//               aria-label="Dropdown"
//             >
//               Kategoria: {category}
//             </Button>
//             <ul
//               className="dropdown-menu dropdown-open:opacity-100 hidden w-96"
//               role="menu"
//               aria-orientation="vertical"
//               aria-labelledby="category"
//             >
//               {Object.values(RecipeCategory).map((cat) => (
//                 <li key={cat}>
//                   <a
//                     className="dropdown-item"
//                     onClick={() => handleCategorySelect(cat)}
//                   >
//                     {cat}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="relative w-96 mx-auto flex gap-2">
//             <input
//               type="checkbox"
//               className="checkbox checkbox-primary my-auto"
//               id="isRestricted"
//               checked={isRestricted}
//               onChange={(e) => setIsRestricted(e.target.checked)}
//             />
//             <label className="label -mt-1 cursor-pointer flex-col items-start pt-0" htmlFor="isRestricted">
//               <span className="label-text text-base w-full">Prywatny</span>
//               <span className="label-text-alt w-full">Tylko Ty będziesz widzieć ten przepis.</span>
//             </label>
//           </div>

//           <Button type="submit">Dodaj przepis</Button>
//         </form>
//   );
// };

// export default AddRecipe;
import { useAppDispatch } from '../../store';
import { auth } from '../../firebaseConfig';
import { addRecipe } from '../../features/recipeSlice';
import Button from '../Button/Button';
import { RecipeCategory } from '../../models/Recipe';
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Create an instance of Notyf
const notyf = new Notyf();

const AddRecipe: React.FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.BREAKFAST);
  const [isRestricted, setIsRestricted] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    window.HSStaticMethods.autoInit(["dropdown"]);
  }, []);

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert('Musisz być zalogowany, aby dodać przepis.');
      return;
    }

    const newRecipe = {
      authorId: user.uid, // Użyj uid użytkownika
      name,
      description,
      preparationTime,
      instructions,
      category,
      isRestricted,
    };

    // Wywołaj addRecipe, aby dodać przepis i zaktualizować myRecipes
    dispatch(addRecipe(newRecipe));

    setName('');
    setDescription('');
    setPreparationTime('');
    setInstructions('');
    setCategory(RecipeCategory.BREAKFAST);
    setIsRestricted(false);

    notyf.success('Przepis został dodany');

    setTimeout(() => {
      navigateTo("/");
    }, 3000);
  };

  const handleCategorySelect = (selectedCategory: RecipeCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <form onSubmit={handleAddRecipe} className='card-body flex flex-col justify-between gap-y-6 border border-neutral mb-4'>
      <div className="relative w-96 mx-auto">
        <label className="label label-text" htmlFor="name">
          Nazwa przepisu
        </label>
        <input
          required
          maxLength={45}
          type="text"
          className="input"
          id="name"
          placeholder="Nazwij swój przepis."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="relative w-96 mx-auto">
        <label className="label label-text" htmlFor="description">
          Opis
        </label>
        <textarea
          required
          maxLength={130}
          className="textarea"
          placeholder="Opisz krótko swój przepis."
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="relative w-96 mx-auto">
        <label className="label label-text" htmlFor="preparationTime">
          Czas przygotowania
        </label>
        <input
          required
          type="text"
          className="input"
          id="preparationTime"
          placeholder="Czas przygotowania (w minutach)."
          value={preparationTime}
          onChange={(e) => setPreparationTime(e.target.value)}
        />
      </div>

      <div className="relative w-96 mx-auto">
        <label className="label label-text" htmlFor="instructions">
          Instrukcje
        </label>
        <textarea
          required
          className="textarea"
          placeholder="Tutaj rozpisz kroki przygotowania posiłku."
          value={instructions}
          id='instructions'
          onChange={(e) => setInstructions(e.target.value)}
        ></textarea>
      </div>

      <div className="w-96 mx-auto dropdown relative inline-flex rtl:[--placement:bottom-end]">
        <Button
          id="category"
          type="button"
          className="w-96 dropdown-toggle btn btn-soft"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Dropdown"
        >
          Kategoria: {category}
        </Button>
        <ul
          className="dropdown-menu dropdown-open:opacity-100 hidden w-96"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="category"
        >
          {Object.values(RecipeCategory).map((cat) => (
            <li key={cat}>
              <a
                className="dropdown-item"
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative w-96 mx-auto flex gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary my-auto"
          id="isRestricted"
          checked={isRestricted}
          onChange={(e) => setIsRestricted(e.target.checked)}
        />
        <label className="label -mt-1 cursor-pointer flex-col items-start pt-0" htmlFor="isRestricted">
          <span className="label-text text-base w-full">Prywatny</span>
          <span className="label-text-alt w-full">Tylko Ty będziesz widzieć ten przepis.</span>
        </label>
      </div>

      <Button type="submit">Dodaj przepis</Button>
    </form>
  );
};

export default AddRecipe;
