
/**
 * This function would be deployed as a Supabase Edge Function
 * to handle form submissions and save them to a Supabase table.
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Deno runtime
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get the request body
    const body = await req.json();
    
    // Validate the request data
    if (!body.country || !body.city || !body.purpose || !body.submissionDate) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Insert the application data into the Supabase table
    const { data, error } = await supabase
      .from('visa_applications')
      .insert([
        {
          country: body.country,
          city: body.city,
          duration: body.duration,
          purpose: body.purpose,
          submission_date: body.submissionDate,
          appointment_date: body.sameAppointmentDate ? body.submissionDate : body.appointmentDate,
          passport_returned: body.passportReturned,
          return_date: body.returnDate,
          result_status: body.resultStatus,
          validity: body.validity,
          entry_type: body.entryType,
          rejection_reason: body.rejectionReason,
          // Add any additional fields if needed
        }
      ])
      .select();
    
    if (error) {
      console.error('Error inserting data:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error handling request:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
