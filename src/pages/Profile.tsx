
import { TrendingUp, BookOpen, Star, Heart, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecipes } from '@/hooks/useRecipes';

export const Profile = () => {
  const { recipes } = useRecipes();

  const stats = {
    totalRecipes: recipes.length,
    averageRating: recipes.length > 0 
      ? recipes.reduce((sum, recipe) => sum + recipe.personalRating, 0) / recipes.length 
      : 0,
    favoriteRecipes: recipes.filter(r => r.isFavorite).length,
    highRatedRecipes: recipes.filter(r => r.personalRating >= 8).length,
  };

  const getConfidenceLevel = () => {
    if (recipes.length === 0) return { level: 'Iniciante', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    
    const avgRating = stats.averageRating;
    if (avgRating >= 8.5) return { level: 'Mestre Chef', color: 'text-purple-600', bgColor: 'bg-purple-100' };
    if (avgRating >= 7.5) return { level: 'Experiente', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (avgRating >= 6.5) return { level: 'Intermediário', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: 'Iniciante', color: 'text-blue-600', bgColor: 'bg-blue-100' };
  };

  const confidenceLevel = getConfidenceLevel();

  const getCategoryStats = () => {
    const categories = recipes.reduce((acc, recipe) => {
      acc[recipe.category] = (acc[recipe.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryLabels = {
      'entrada': 'Entradas',
      'prato-principal': 'Pratos Principais',
      'sobremesa': 'Sobremesas',
      'bebida': 'Bebidas',
      'lanche': 'Lanches',
      'aperitivo': 'Aperitivos',
    };

    return Object.entries(categories).map(([category, count]) => ({
      category: categoryLabels[category as keyof typeof categoryLabels] || category,
      count,
      percentage: (count / recipes.length) * 100,
    }));
  };

  const categoryStats = getCategoryStats();

  const getProgressMessages = () => {
    const messages = [];
    
    if (stats.totalRecipes >= 50) {
      messages.push("🏆 Mestre das Receitas - Mais de 50 receitas!");
    } else if (stats.totalRecipes >= 25) {
      messages.push("🥇 Cozinheiro Experiente - Mais de 25 receitas!");
    } else if (stats.totalRecipes >= 10) {
      messages.push("🥈 Aprendiz Avançado - Mais de 10 receitas!");
    } else if (stats.totalRecipes >= 5) {
      messages.push("🥉 Iniciante Dedicado - Mais de 5 receitas!");
    }

    if (stats.averageRating >= 8.5) {
      messages.push("⭐ Perfeccionista - Média de avaliação excelente!");
    }

    if (stats.favoriteRecipes >= 10) {
      messages.push("💝 Colecionador de Favoritas!");
    }

    return messages;
  };

  const achievements = getProgressMessages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="px-6 py-6 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-600">T</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Thay</h1>
          <p className="text-gray-600 text-sm">Estudante de Gastronomia</p>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${confidenceLevel.bgColor} ${confidenceLevel.color}`}>
            {confidenceLevel.level}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Estatísticas Principais */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="text-orange-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800">{stats.totalRecipes}</div>
              <div className="text-sm text-gray-600">Total de Receitas</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="text-orange-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Média Geral</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="text-orange-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800">{stats.favoriteRecipes}</div>
              <div className="text-sm text-gray-600">Favoritas</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800">{stats.highRatedRecipes}</div>
              <div className="text-sm text-gray-600">Nota ≥ 8</div>
            </CardContent>
          </Card>
        </div>

        {/* Progresso por Categoria */}
        {categoryStats.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Receitas por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryStats.map((stat) => (
                <div key={stat.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{stat.category}</span>
                    <span className="text-gray-600">{stat.count} receitas</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Conquistas */}
        {achievements.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Award className="text-orange-600" size={20} />
                Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-800">{achievement}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Mensagem de Motivação */}
        <Card className="bg-gradient-to-r from-orange-100 to-amber-100 border-orange-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">
              Continue explorando!
            </h3>
            <p className="text-orange-700 text-sm">
              Cada receita é uma nova oportunidade de aprender e crescer como chef. 
              Continue registrando suas criações e acompanhe sua evolução!
            </p>
          </CardContent>
        </Card>

        {recipes.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <BookOpen size={48} className="mx-auto text-orange-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Comece sua jornada!
              </h3>
              <p className="text-gray-600 text-sm">
                Adicione sua primeira receita e comece a acompanhar seu progresso gastronômico.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
