// import { createContext, useContext, useState, ReactNode } from 'react';
// import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
// import { db, auth } from '../firebaseConfig';

// export interface RecipeData {
//   id: string;
// 	// authorID: string;
// 	// author: string;
// 	title: string;
// 	preparationTime: number;
// 	// ingredients: Product[];
// 	instructions: string;
// 	category: string;
// 	// shoppingList: ShoppingList;
// 	isRestricted: boolean;
// 	description: string
// }

// interface RecipeContextType {
// 	recipes: RecipeData[];
// 	fetchRecipes: () => void;
// 	addRecipe: (
// 		name: string
// 	) => void;
// 	handleDeleteRecipe: (id: string) => void;
// }

// const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

// export const useRecipes = () => {
// 	const context = useContext(RecipeContext);
// 	if (!context) {
// 		throw new Error("useRecipes must be used within a RecipeProvider!");
// 	}
// 	return context;
// }

// export const RecipeProvider = ({ children }: {children: ReactNode}) => {
// 	const [recipes, setRecipes] = useState<RecipeData[]>([]);

// 	const fetchRecipes = async () => {
// 		if (!auth.currentUser) return;

// 		const recipesCollection = collection(db, 'recipes');
// 		const recipesQuery = query(recipesCollection, where('uid', '==', auth.currentUser.uid));
// 		const recipeSnapshot = await getDocs(recipesQuery);

// 		const recipeList = recipeSnapshot.docs.map((doc) => ({
// 			id: doc.id,
// 			title: doc.data().title,
// 			preparationTime: doc.data().preparationTime,
// 			instructions: doc.data().instructions,
// 			category: doc.data().category,
// 			isRestricted: doc.data().isRestricted,
// 			description: doc.data().description
// 		}));

// 		setRecipes(recipeList.sort());
// 	}

// 	const addRecipe = async(title: string) => {

// 		if(!auth.currentUser) return;
// 		try {
// 			const docRef = await addDoc(collection(db, 'recipes'), {
// 				title,
// 				uid: auth.currentUser.uid,
// 				preparationTime: 0,
// 				instructions: '',
// 				category: '',
// 				isRestricted: false,
// 				description: ''
// 			});

// 			setRecipes([
// 				{
// 					id: docRef.id,
// 					title,
// 					preparationTime: 0,
// 					instructions: '',
// 					category: '',
// 					isRestricted: false,
// 					description: ''
// 				}, ...recipes
// 			]);
// 		} catch (err) {
// 			console.error("Error adding recipe:", err)
// 		}
// 	}

// 	async function handleDeleteRecipe(id:string) {
// 		try {
// 			await deleteDoc(doc(db, 'recipes', id));
// 			setRecipes(recipes.filter(recipe => recipe.id !== id));

// 		} catch (err) {
// 			console.error("Error deleting notebook: ", err);
// 		}
// 	}

// 	return (
// 		<RecipeContext.Provider
// 			value={{ recipes, fetchRecipes, addRecipe, handleDeleteRecipe }}
// 		>
// 			{ children }
// 		</RecipeContext.Provider>
// 	)
// }