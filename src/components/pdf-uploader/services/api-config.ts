
// Central configuration for API keys and settings
// This file provides the hardcoded API key for all users

// Your fixed API key that all users will use
const CENTRAL_API_KEY = "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";

export const API_CONFIGURATION = {
  // Always return the central API key
  get OPENAI_API_KEY(): string {
    return CENTRAL_API_KEY;
  },
  
  // No need to set API key anymore, but keep method for compatibility
  set OPENAI_API_KEY(value: string) {
    // Do nothing - we don't allow users to change the API key
    console.log("API key cannot be changed - using central key");
  },
  
  // Default settings
  defaultProvider: "openai",
  defaultModel: "gpt-4o-mini",
  
  // Model property - added to fix TS errors
  _model: "gpt-4o-mini",
  
  // Getter and setter for model property
  get model(): string {
    return this._model;
  },
  
  set model(value: string) {
    this._model = value;
  },
  
  // Always disable simulation mode
  useSimulationMode: false,
  
  // Always return true since we have a central API key
  get hasApiKey(): boolean {
    return true;
  },

  // Clear API key does nothing now
  clearApiKey(): void {
    // Do nothing - we don't allow users to clear the API key
    console.log("API key cannot be cleared - using central key");
  }
};
