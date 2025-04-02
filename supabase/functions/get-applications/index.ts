
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Configure CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    const sortBy = url.searchParams.get('sortBy') || 'created_at';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';
    const filterCountry = url.searchParams.get('country') || null;
    const filterPurpose = url.searchParams.get('purpose') || null;
    const searchTerm = url.searchParams.get('search') || '';

    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Build query
    let query = supabase.from('visa_applications').select('*', { count: 'exact' });
    
    // Apply filters
    if (filterCountry) {
      query = query.eq('country', filterCountry);
    }
    
    if (filterPurpose) {
      query = query.eq('purpose', filterPurpose);
    }
    
    if (searchTerm) {
      query = query.or(`country.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,purpose.ilike.%${searchTerm}%`);
    }
    
    // Get total count first
    const { count, error: countError } = await query.select('id', { count: 'exact', head: true });
    
    if (countError) {
      throw new Error(`Count error: ${countError.message}`);
    }
    
    // Apply pagination and sorting
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error } = await query
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(from, to);
    
    if (error) {
      throw new Error(`Data fetch error: ${error.message}`);
    }
    
    return new Response(
      JSON.stringify({
        data: data || [],
        pagination: {
          page,
          pageSize,
          total: count,
          totalPages: Math.ceil(count / pageSize),
        },
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (err) {
    console.error('Error fetching applications:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to fetch applications' }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
