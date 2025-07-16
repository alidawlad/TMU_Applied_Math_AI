import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// AI Configuration and Availability Detection
export interface AIConfig {
  configured: boolean;
  available: boolean;
  lastCheck: Date;
  error?: string;
  apiKey?: string;
}

// Check if Google AI API key is configured
function checkGoogleAIConfiguration(): { configured: boolean; error?: string } {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey) {
    return {
      configured: false,
      error: 'GOOGLE_AI_API_KEY environment variable is not set'
    };
  }
  
  if (apiKey === 'your-google-ai-api-key' || apiKey.length < 20) {
    return {
      configured: false,
      error: 'GOOGLE_AI_API_KEY appears to be a placeholder or invalid'
    };
  }
  
  return { configured: true };
}

// Get AI configuration status
export function getAIConfig(): AIConfig {
  const configCheck = checkGoogleAIConfiguration();
  
  return {
    configured: configCheck.configured,
    available: configCheck.configured, // Initially assume available if configured
    lastCheck: new Date(),
    error: configCheck.error,
    apiKey: configCheck.configured ? process.env.GOOGLE_AI_API_KEY?.substring(0, 8) + '...' : undefined
  };
}

// Initialize Genkit with error handling
function initializeGenkit() {
  const config = getAIConfig();
  
  if (!config.configured) {
    console.warn('🤖 AI Features Disabled:', config.error);
    console.warn('🔧 To enable AI features, set GOOGLE_AI_API_KEY in your environment variables');
    
    // Return a mock AI instance that will throw meaningful errors
    return null;
  }
  
  try {
    console.log('🤖 Initializing AI with Gemini 2.0 Flash...');
    const aiInstance = genkit({
      plugins: [googleAI()],
      model: 'googleai/-2.0-flash',
    });
    console.log('✅ AI successfully initialized');
    return aiInstance;
  } catch (error) {
    console.error('❌ Failed to initialize AI:', error);
    return null;
  }
}

// Export AI instance (may be null if not configured)
export const ai = initializeGenkit();

// Check if AI is available for use
export function isAIAvailable(): boolean {
  return ai !== null && getAIConfig().configured;
}

// Get AI status for UI display
export function getAIStatus(): { status: 'available' | 'unavailable' | 'error'; message: string } {
  const config = getAIConfig();
  
  if (!config.configured) {
    return {
      status: 'unavailable',
      message: config.error || 'AI not configured'
    };
  }
  
  if (!ai) {
    return {
      status: 'error',
      message: 'AI initialization failed'
    };
  }
  
  return {
    status: 'available',
    message: 'AI services ready'
  };
}
