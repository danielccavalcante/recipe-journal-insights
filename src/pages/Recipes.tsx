
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RecipeCard } from '@/components/RecipeCard';
import { useRecipes } from '@/hooks/useRecipes';

interface RecipesProps {
  onRecipeClick: (recipe: any) => void;
}

export const Recipes = ({ onRecipeClick }: RecipesProps) => {
  const { recipes, toggleFavorite } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const categoryOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'entrada', label: 'Entradas' },
    { value: 'prato-principal', label: 'Pratos Principais' },
    { value: 'sobremesa', label: 'Sobremesas' },
    { value: 'bebida', label: 'Bebidas' },
    { value: 'lanche', label: 'Lanches' },
    { value: 'aperitivo', label: 'Aperitivos' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Mais Recentes' },
    { value: 'oldest', label: 'Mais Antigas' },
    { value: 'rating-high', label: 'Melhor Avaliação' },
    { value: 'rating-low', label: 'Menor Avaliação' },
    { value: 'name', label: 'Nome A-Z' },
  ];

  const filteredAndSortedRecipes = recipes
    .filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'rating-high':
          return b.personalRating - a.personalRating;
        case 'rating-low':
          return a.personalRating - b.personalRating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Minhas Receitas
          </h1>
          <p className="text-gray-600 text-center mt-1 text-sm">
            {recipes.length} receita{recipes.length !== 1 ? 's' : ''} cadastrada{recipes.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <Input
            placeholder="Buscar receitas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Filtros */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Filter size={16} />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Categoria
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Ordenar por
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Receitas */}
        <div className="space-y-3">
          {filteredAndSortedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onToggleFavorite={toggleFavorite}
              onClick={onRecipeClick}
            />
          ))}
        </div>

        {filteredAndSortedRecipes.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">
                {searchTerm || categoryFilter !== 'all'
                  ? 'Nenhuma receita encontrada com os filtros aplicados.'
                  : 'Nenhuma receita cadastrada ainda.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
