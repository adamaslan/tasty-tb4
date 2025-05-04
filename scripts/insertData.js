// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import the Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Check if the variables are loaded correctly
if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Make sure SUPABASE_URL and SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1); // Exit the script if keys are missing
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Original data - now using release_date
const modelsData = [
  {
    name: 'Llama 4 Scout',
    type: 'multimodal',
    parameter_count: 17000000000,
    experts: 16,
    context_window_tokens: 10000000,
    release_date: null // Use release_date, set actual date if known, otherwise null
  },
  {
    name: 'Llama 4 Maverick',
    type: 'multimodal',
    parameter_count: 17000000000,
    experts: 128,
    context_window_tokens: 1000000,
    release_date: null // Use release_date, set actual date if known, otherwise null
  }
];

// New data - already using release_date
const otherModelsData = [
  {
    name: 'GPT-4',
    type: 'multimodal',
    parameter_count: null,
    experts: 8,
    context_window_tokens: 128000,
    release_date: '2023-03-14' // Use release_date
  },
  {
    name: 'Claude 3 Opus',
    type: 'multimodal',
    parameter_count: null,
    experts: null,
    context_window_tokens: 200000,
    release_date: '2024-03-04' // Use release_date
  },
  {
    name: 'Gemini 1.5 Pro',
    type: 'multimodal',
    parameter_count: null,
    experts: null,
    context_window_tokens: 1000000,
    release_date: '2024-02-15' // Use release_date
  },
  {
    name: 'Mixtral 8x7B',
    type: 'text',
    parameter_count: 46700000000,
    experts: 8,
    context_window_tokens: 32000,
    release_date: '2023-12-11' // Use release_date
  }
];

// Combine the data arrays
// const allModelsData = [...modelsData, ...otherModelsData]; // Comment this out

// Insert the combined data into the 'models' table
// async function insertAllModels() { ... } // Comment out this function definition
// insertAllModels(); // Comment out this call

// --- Insert only the original Llama data ---
async function insertOriginalModels() {
  const { data, error } = await supabase
    .from('models')
    .insert(modelsData); // Use only the original data array

  if (error) {
    console.error('Error inserting original models data:', error);
  } else {
    console.log('Original models data inserted successfully:', data);
  }
}
// insertOriginalModels(); // Comment out the call to prevent execution
console.log("Script setup complete. Insertion functions are removed or commented out as data is likely already present.");
// You could potentially add other utility functions here if needed,
// or simply delete this file if it serves no further purpose.