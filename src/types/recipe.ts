
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: 'entrada' | 'prato-principal' | 'sobremesa' | 'bebida' | 'lanche' | 'aperitivo';
  ingredients: Ingredient[];
  steps: string[];
  prepTime: number; // em minutos
  servings: number;
  imageUrl?: string;
  personalNotes: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  personalRating: number; // 1-10
  improvements: string;
  learnings: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  totalRecipes: number;
  averageRating: number;
  confidenceLevel: string;
  favoriteRecipes: number;
}
