import { useState } from 'react';
import { Plus, Minus, Camera, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRecipes } from '@/hooks/useRecipes';
import { Ingredient } from '@/types/recipe';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface NewRecipeProps {
  onRecipeAdded: () => void;
}

export const NewRecipe = ({ onRecipeAdded }: NewRecipeProps) => {
  const { addRecipe } = useRecipes();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '' as any,
    prepTime: '',
    servings: '',
    imageUrl: '',
    personalNotes: '',
    difficulty: 1 as 1 | 2 | 3 | 4 | 5,
    personalRating: 5,
    improvements: '',
    learnings: '',
    isFavorite: false,
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: '', quantity: 0, unit: '' }
  ]);

  const [steps, setSteps] = useState<string[]>(['']);

  const categoryOptions = [
    { value: 'entrada', label: 'Entrada' },
    { value: 'prato-principal', label: 'Prato Principal' },
    { value: 'sobremesa', label: 'Sobremesa' },
    { value: 'bebida', label: 'Bebida' },
    { value: 'lanche', label: 'Lanche' },
  { value: 'aperitivo', label: 'Aperitivo' },
  ];

  const unitOptions = ['g', 'kg', 'ml', 'l', 'xícara', 'colher (sopa)', 'colher (chá)', 'unidade', 'dente', 'pitada'];

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now().toString(), name: '', quantity: 0, unit: '' }]);
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.id !== id));
    }
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: any) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const updateStep = (index: number, value: string) => {
    setSteps(steps.map((step, i) => i === index ? value : step));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.prepTime || !formData.servings) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const validIngredients = ingredients.filter(ing => ing.name && ing.quantity && ing.unit);
    const validSteps = steps.filter(step => step.trim());

    if (validIngredients.length === 0 || validSteps.length === 0) {
      toast({
        title: "Dados incompletos",
        description: "Adicione pelo menos um ingrediente e um passo.",
        variant: "destructive",
      });
      return;
    }

    addRecipe({
      ...formData,
      prepTime: parseInt(formData.prepTime),
      servings: parseInt(formData.servings),
      ingredients: validIngredients,
      steps: validSteps,
    });

    toast({
      title: "Receita adicionada!",
      description: "Sua receita foi salva com sucesso.",
    });

    onRecipeAdded();
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={cn(
          "cursor-pointer transition-colors",
          i < difficulty ? "fill-orange-400 text-orange-400" : "text-gray-300 hover:text-orange-300"
        )}
        onClick={() => setFormData({ ...formData, difficulty: (i + 1) as 1 | 2 | 3 | 4 | 5 })}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Nova Receita
          </h1>
          <p className="text-gray-600 text-center mt-1 text-sm">
            Registre sua nova criação culinária
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Informações Básicas */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nome da Receita *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Bolo de Chocolate"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Categoria *
              </label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as any })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Tempo de Preparo (min) *
                </label>
                <Input
                  type="number"
                  value={formData.prepTime}
                  onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                  placeholder="30"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Rendimento (porções) *
                </label>
                <Input
                  type="number"
                  value={formData.servings}
                  onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                  placeholder="4"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                URL da Foto
              </label>
              <div className="flex gap-2">
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://exemplo.com/foto.jpg"
                />
                <Button type="button" variant="outline" size="icon">
                  <Camera size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredientes */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Ingredientes</CardTitle>
            <Button type="button" onClick={addIngredient} size="sm" variant="outline">
              <Plus size={16} />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                    placeholder="Nome do ingrediente"
                  />
                </div>
                <div className="w-20">
                  <Input
                    type="number"
                    value={ingredient.quantity || ''}
                    onChange={(e) => updateIngredient(ingredient.id, 'quantity', parseFloat(e.target.value) || 0)}
                    placeholder="Qtd"
                  />
                </div>
                <div className="w-24">
                  <Select value={ingredient.unit} onValueChange={(value) => updateIngredient(ingredient.id, 'unit', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions.map(unit => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  onClick={() => removeIngredient(ingredient.id)}
                  size="icon"
                  variant="outline"
                  disabled={ingredients.length === 1}
                >
                  <Minus size={16} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Modo de Preparo */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Modo de Preparo</CardTitle>
            <Button type="button" onClick={addStep} size="sm" variant="outline">
              <Plus size={16} />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-2 items-start">
                <span className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-2 flex-shrink-0">
                  {index + 1}
                </span>
                <Textarea
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  placeholder={`Passo ${index + 1}`}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={() => removeStep(index)}
                  size="icon"
                  variant="outline"
                  disabled={steps.length === 1}
                  className="mt-2"
                >
                  <Minus size={16} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Avaliação Pessoal */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Avaliação Pessoal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Nível de Dificuldade
              </label>
              <div className="flex gap-1">
                {getDifficultyStars(formData.difficulty)}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nota Pessoal (1-10)
              </label>
              <Input
                type="range"
                min="1"
                max="10"
                value={formData.personalRating}
                onChange={(e) => setFormData({ ...formData, personalRating: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600 mt-1">
                {formData.personalRating}/10
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                O que posso melhorar?
              </label>
              <Textarea
                value={formData.improvements}
                onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                placeholder="Anote pontos de melhoria para a próxima vez..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                O que aprendi com essa receita?
              </label>
              <Textarea
                value={formData.learnings}
                onChange={(e) => setFormData({ ...formData, learnings: e.target.value })}
                placeholder="Registre seus aprendizados..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Notas Pessoais
              </label>
              <Textarea
                value={formData.personalNotes}
                onChange={(e) => setFormData({ ...formData, personalNotes: e.target.value })}
                placeholder="Anote suas impressões, ajustes feitos, etc..."
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
          Salvar Receita
        </Button>
      </form>
    </div>
  );
};
