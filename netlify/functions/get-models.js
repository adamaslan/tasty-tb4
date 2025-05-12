const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  try {
    // Get query parameters if needed
    const params = event.queryStringParameters || {};
    
    // Query the models from Supabase
    const { data, error } = await supabase
      .from('models')
      .select('*')
      .order('release_date', { ascending: false });
    
    if (error) throw error;
    
    // Return successful response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data || []),
    };
  } catch (error) {
    console.error('Function error:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch models' }),
    };
  }
};