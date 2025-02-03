import { useAppDispatch } from '../../store';
import { auth } from '../../firebaseConfig';
import { addRecipe } from '../../features/recipeSlice';
import Button from '../Button/Button';
import { RecipeCategory } from '../../models/Recipe';
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product, ProductUnit } from '../../models/Product';

const notyf = new Notyf();

const AddRecipe: React.FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.BREAKFAST);
  const [isRestricted, setIsRestricted] = useState(false);
  const [shoppingList, setShoppingList] = useState<Product[]>([]); // Nowy stan na listę produktów

  const navigateTo = useNavigate();

  useEffect(() => {
    window.HSStaticMethods.autoInit(["dropdown"]);
  }, []);

  // Funkcja do obsługi zmiany wartości produktu
  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    const updatedList = [...shoppingList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setShoppingList(updatedList);
  };

  // Funkcja do dodawania nowego produktu do listy
  const addProduct = () => {
    setShoppingList([
      ...shoppingList,
      { name: '', amount: 0, unit: ProductUnit.GRAM }, // Domyślny produkt
    ]);
  };

  // Funkcja do usuwania produktu z listy
  const removeProduct = (index: number) => {
    const updatedList = shoppingList.filter((_, i) => i !== index);
    setShoppingList(updatedList);
  };

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert('Musisz być zalogowany, aby dodać przepis.');
      return;
    }

    const newRecipe = {
      authorId: user.uid,
      name,
      description,
      preparationTime,
      instructions,
      category,
      isRestricted,
      shoppingList, // Dodajemy listę zakupów
    };

    dispatch(addRecipe(newRecipe));

    setName('');
    setDescription('');
    setPreparationTime('');
    setInstructions('');
    setCategory(RecipeCategory.BREAKFAST);
    setIsRestricted(false);
    setShoppingList([]); // Resetujemy listę produktów

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
      <div className="relative w-1/2 mx-auto">
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

      <div className="relative w-1/2 mx-auto">
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

      <div className="relative w-1/2 mx-auto">
        <label className="label label-text" htmlFor="preparationTime">
          Czas przygotowania
        </label>
        <input
          required
          type="number"
          className="input"
          min="1"
          id="preparationTime"
          placeholder="Czas przygotowania (w minutach)."
          value={preparationTime}
          onChange={(e) => setPreparationTime(e.target.value)}
        />
      </div>

      <div className="relative w-1/2 mx-auto">
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

      {/* Kategoria */}
      <div className="w-1/2 mx-auto dropdown relative inline-flex rtl:[--placement:bottom-end]">
        <Button
          id="category"
          type="button"
          className="w-full dropdown-toggle btn btn-soft"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Dropdown"
        >
          Kategoria: {category}
        </Button>
        <ul
          className="dropdown-menu dropdown-open:opacity-100 hidden w-1/2"
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

      {/* Lista zakupów */}
      <div className="relative w-1/2 mx-auto">
        <h3 className="label label-text">Produkty</h3>
        {shoppingList.map((product, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              required
              placeholder="Nazwa"
              value={product.name}
              onChange={(e) => handleProductChange(index, 'name', e.target.value)}
              className="input input-lg w-4/12"
            />
            <input
              type="number"
              placeholder="Ilość"
              min="1"
              value={product.amount}
              onChange={(e) => handleProductChange(index, 'amount', Number(e.target.value))}
              className="input input-lg w-2/12"
            />
            <select
              value={product.unit}
              onChange={(e) => handleProductChange(index, 'unit', e.target.value)}
              className="select input-lg w-3/12"
            >
              <option value={ProductUnit.GRAM}>{ProductUnit.GRAM}</option>
              <option value={ProductUnit.PIECE}>{ProductUnit.PIECE}</option>
            </select>
            <Button
              type="button"
              className="btn btn-error w-3/12"
              onClick={() => removeProduct(index)}
            >
              Usuń
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addProduct}>
          Dodaj produkt
        </Button>
      </div>

      {/* Prywatność */}
      <div className="relative w-1/2 mx-auto flex gap-2">
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
