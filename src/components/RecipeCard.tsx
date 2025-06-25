import { Star, Clock, Users, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types/recipe';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: string) => void;
  onClick: (recipe: Recipe) => void;
}

export const RecipeCard = ({ recipe, onToggleFavorite, onClick }: RecipeCardProps) => {
  const categoryLabels = {
    'entrada': 'Entrada',
    'prato-principal': 'Prato Principal',
    'sobremesa': 'Sobremesa',
    'bebida': 'Bebida',
    'lanche': 'Lanche',
    'aperitivo': 'Aperitivo',
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={cn(
          i < difficulty ? "fill-orange-400 text-orange-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div onClick={() => onClick(recipe)}>
        {recipe.imageUrl && (
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
              {recipe.name}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(recipe.id);
              }}
              className="p-1 h-auto"
            >
              <Heart
                size={16}
                className={cn(
                  recipe.isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-400"
                )}
              />
            </Button>
          </div>

          <div className="space-y-2">
            <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full">
              {categoryLabels[recipe.category]}
            </span>

            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{recipe.prepTime}min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>{recipe.servings} porções</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {getDifficultyStars(recipe.difficulty)}
              </div>
              <div className="text-xs font-medium text-orange-600">
                {recipe.personalRating}/10
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
