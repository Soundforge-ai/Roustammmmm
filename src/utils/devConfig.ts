/**
 * Development Configuration Checker
 * Helpt bij het debuggen van configuratieproblemen
 */

export interface ConfigStatus {
  name: string;
  status: 'ok' | 'warning' | 'error';
  message: string;
  value?: string;
}

/**
 * Controleert alle belangrijke configuratie-instellingen
 */
export function checkConfig(): ConfigStatus[] {
  const checks: ConfigStatus[] = [];

  // Supabase configuratie
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  checks.push({
    name: 'Supabase URL',
    status: supabaseUrl ? 'ok' : 'error',
    message: supabaseUrl ? 'Geconfigureerd' : 'Niet geconfigureerd - database functionaliteit werkt niet',
    value: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : undefined
  });

  checks.push({
    name: 'Supabase Anon Key',
    status: supabaseKey ? 'ok' : 'warning',
    message: supabaseKey ? 'Geconfigureerd' : 'Niet geconfigureerd',
    value: supabaseKey ? `${supabaseKey.substring(0, 10)}...` : undefined
  });

  // API Keys
  const glmKey = import.meta.env.VITE_GLM_API_KEY;
  checks.push({
    name: 'GLM API Key',
    status: glmKey ? 'ok' : 'warning',
    message: glmKey ? 'Geconfigureerd' : 'Niet geconfigureerd - chatbot werkt mogelijk niet',
    value: glmKey ? `${glmKey.substring(0, 10)}...` : undefined
  });

  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
  checks.push({
    name: 'Gemini API Key',
    status: geminiKey ? 'ok' : 'warning',
    message: geminiKey ? 'Geconfigureerd' : 'Niet geconfigureerd (optioneel)',
    value: geminiKey ? `${geminiKey.substring(0, 10)}...` : undefined
  });

  // Environment mode
  const isDev = import.meta.env.DEV;
  checks.push({
    name: 'Environment Mode',
    status: 'ok',
    message: isDev ? 'Development Mode' : 'Production Mode',
    value: isDev ? 'DEV' : 'PROD'
  });

  return checks;
}

/**
 * Logt alle configuratie status naar de console
 */
export function logConfigStatus(): void {
  if (!import.meta.env.DEV) return;
  
  console.group('🔧 Yannova Configuratie Status');
  const checks = checkConfig();
  checks.forEach(check => {
    const icon = check.status === 'ok' ? '✅' : check.status === 'warning' ? '⚠️' : '❌';
    console.log(`${icon} ${check.name}: ${check.message}`);
    if (check.value) {
      console.log(`   Waarde: ${check.value}`);
    }
  });
  console.groupEnd();
}

/**
 * Retourneert een samenvatting van ontbrekende configuratie
 */
export function getMissingConfig(): string[] {
  const checks = checkConfig();
  return checks
    .filter(check => check.status === 'error')
    .map(check => check.name);
}

