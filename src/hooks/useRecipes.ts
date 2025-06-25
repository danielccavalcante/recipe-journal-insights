
import { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe';

const STORAGE_KEY = 'thay-recipes';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedRecipes = JSON.parse(stored).map((recipe: any) => ({
          ...recipe,
          createdAt: new Date(recipe.createdAt),
          updatedAt: new Date(recipe.updatedAt),
        }));
        setRecipes(parsedRecipes);
      } catch (error) {
        console.error('Erro ao carregar receitas:', error);
      }
    }
  }, []);

  const saveRecipes = (newRecipes: Recipe[]) => {
    setRecipes(newRecipes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecipes));
  };

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    saveRecipes([...recipes, newRecipe]);
  };

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    const updatedRecipes = recipes.map(recipe =>
      recipe.id === id
        ? { ...recipe, ...updates, updatedAt: new Date() }
        : recipe
    );
    saveRecipes(updatedRecipes);
  };

  const deleteRecipe = (id: string) => {
    const filteredRecipes = recipes.filter(recipe => recipe.id !== id);
    saveRecipes(filteredRecipes);
  };

  const toggleFavorite = (id: string) => {
    updateRecipe(id, { isFavorite: !recipes.find(r => r.id === id)?.isFavorite });
  };

  return {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite,
  };
};
