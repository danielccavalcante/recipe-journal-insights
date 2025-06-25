
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Home } from "@/pages/Home";
import { Recipes } from "@/pages/Recipes";
import { NewRecipe } from "@/pages/NewRecipe";
import { Profile } from "@/pages/Profile";

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleRecipeClick = (recipe: any) => {
    // Por enquanto, apenas muda para a aba de receitas
    console.log('Recipe clicked:', recipe);
  };

  const handleRecipeAdded = () => {
    setActiveTab('home');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home onRecipeClick={handleRecipeClick} />;
      case 'recipes':
        return <Recipes onRecipeClick={handleRecipeClick} />;
      case 'new-recipe':
        return <NewRecipe onRecipeAdded={handleRecipeAdded} />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onRecipeClick={handleRecipeClick} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          {renderActiveTab()}
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
