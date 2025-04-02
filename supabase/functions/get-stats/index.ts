
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
    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get total applications count
    const { count: totalApplications, error: countError } = await supabase
      .from('visa_applications')
      .select('*', { count: 'exact', head: true });

    if (countError) throw new Error(`Count error: ${countError.message}`);

    // Calculate average waiting time
    const { data: completedApplications, error: waitingTimeError } = await supabase
      .from('visa_applications')
      .select('submission_date, return_date')
      .not('return_date', 'is', null);

    if (waitingTimeError) throw new Error(`Waiting time error: ${waitingTimeError.message}`);

    let averageWaitingDays = 0;
    if (completedApplications.length > 0) {
      const totalDays = completedApplications.reduce((sum, app) => {
        const submissionDate = new Date(app.submission_date);
        const returnDate = new Date(app.return_date);
        const diffTime = Math.abs(returnDate.getTime() - submissionDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return sum + diffDays;
      }, 0);
      averageWaitingDays = Math.round(totalDays / completedApplications.length);
    }

    // Get latest applications
    const { data: latestApplications, error: latestError } = await supabase
      .from('visa_applications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (latestError) throw new Error(`Latest applications error: ${latestError.message}`);

    // Get date of latest application
    let latestApplicationDate = null;
    if (latestApplications && latestApplications.length > 0) {
      latestApplicationDate = latestApplications[0].created_at;
    }

    // Calculate approval rate
    const { data: approvedApplications, error: approvalError } = await supabase
      .from('visa_applications')
      .select('result_status')
      .eq('result_status', 'Approved');

    if (approvalError) throw new Error(`Approval rate error: ${approvalError.message}`);

    const approvalRate = completedApplications.length > 0
      ? Math.round((approvedApplications.length / completedApplications.length) * 100)
      : 0;

    // Compile statistics
    const statistics = {
      totalApplications: totalApplications || 0,
      averageWaitingDays,
      approvalRate,
      latestApplicationDate,
      latestApplications: latestApplications || [],
      lastUpdated: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify(statistics),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (err) {
    console.error('Error generating statistics:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to generate statistics' }),
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
