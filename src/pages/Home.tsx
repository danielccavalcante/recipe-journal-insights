
import { Star, BookOpen, Heart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecipeCard } from '@/components/RecipeCard';
import { useRecipes } from '@/hooks/useRecipes';
import { UserStats } from '@/types/recipe';

interface HomeProps {
  onRecipeClick: (recipe: any) => void;
}

export const Home = ({ onRecipeClick }: HomeProps) => {
  const { recipes, toggleFavorite } = useRecipes();

  const stats: UserStats = {
    totalRecipes: recipes.length,
    averageRating: recipes.length > 0 
      ? recipes.reduce((sum, recipe) => sum + recipe.personalRating, 0) / recipes.length 
      : 0,
    confidenceLevel: recipes.length === 0 ? 'Iniciante' 
      : recipes.reduce((sum, recipe) => sum + recipe.personalRating, 0) / recipes.length >= 8 ? 'Experiente'
      : recipes.reduce((sum, recipe) => sum + recipe.personalRating, 0) / recipes.length >= 6 ? 'Intermediário'
      : 'Iniciante',
    favoriteRecipes: recipes.filter(r => r.isFavorite).length,
  };

  const recentRecipes = recipes
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const favoriteRecipes = recipes
    .filter(recipe => recipe.isFavorite)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Diário de Receitas da Thay
          </h1>
          <p className="text-gray-600 text-center mt-1 text-sm">
            Seu caderno pessoal de gastronomia
          </p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="text-orange-600" size={20} />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.totalRecipes}</div>
              <div className="text-xs text-gray-600">Receitas</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="text-orange-600" size={20} />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="text-xs text-gray-600">Média</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="text-orange-600" size={20} />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.favoriteRecipes}</div>
              <div className="text-xs text-gray-600">Favoritas</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="text-orange-600" size={20} />
              </div>
              <div className="text-lg font-bold text-gray-800">{stats.confidenceLevel}</div>
              <div className="text-xs text-gray-600">Nível</div>
            </CardContent>
          </Card>
        </div>

        {/* Receitas Recentes */}
        {recentRecipes.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800">Receitas Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onToggleFavorite={toggleFavorite}
                  onClick={onRecipeClick}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Receitas Favoritas */}
        {favoriteRecipes.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800">Receitas Favoritas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onToggleFavorite={toggleFavorite}
                  onClick={onRecipeClick}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {recipes.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <BookOpen size={48} className="mx-auto text-orange-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Bem-vinda ao seu diário!
              </h3>
              <p className="text-gray-600 text-sm">
                Comece adicionando sua primeira receita e registre sua jornada gastronômica.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
