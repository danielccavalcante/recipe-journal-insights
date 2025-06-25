
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.85803d24389e466cb697f3bebf6c9103',
  appName: 'recipe-journal-insights',
  webDir: 'dist',
  server: {
    url: 'https://85803d24-389e-466c-b697-f3bebf6c9103.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#f97316',
      showSpinner: true,
      spinnerColor: '#ffffff'
    }
  }
};

export default config;
