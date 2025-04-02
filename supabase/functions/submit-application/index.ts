
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Configure CORS headers for browser requests
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
    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the request body
    const body = await req.json();

    console.log('Received application data:', body);

    // Validate required fields
    const requiredFields = ['country', 'city', 'duration', 'purpose', 'submissionDate'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Process form data and format for database
    const applicationData = {
      country: body.country,
      city: body.city,
      duration: body.duration,
      purpose: body.purpose,
      submission_date: body.submissionDate,
      appointment_date: body.sameAppointmentDate ? body.submissionDate : body.appointmentDate,
      passport_returned: body.passportReturned || false,
      return_date: body.returnDate,
      result_status: body.resultStatus,
      validity: body.validity,
      entry_type: body.entryType,
      rejection_reason: body.rejectionReason,
    };

    // Insert data into the visa_applications table
    const { data, error } = await supabase
      .from('visa_applications')
      .insert(applicationData)
      .select();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return success response with the created record
    return new Response(
      JSON.stringify({ success: true, data: data[0] }),
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
