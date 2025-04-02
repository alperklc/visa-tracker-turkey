
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const PROJECT_ID = process.env.PROJECT_ID || 'xptezpotlgvxkanvbctd';

if (!SUPABASE_URL) {
  console.error('Error: SUPABASE_URL environment variable is required');
  process.exit(1);
}

if (!SUPABASE_ANON_KEY) {
  console.error('Error: SUPABASE_ANON_KEY environment variable is required');
  process.exit(1);
}

console.log('Generating stats file...');

// Make request to get-stats function
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
  }
};

const functionUrl = `${SUPABASE_URL}/functions/v1/get-stats`;

const request = https.request(functionUrl, options, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    if (response.statusCode >= 400) {
      console.error(`Error: Received status code ${response.statusCode} from function`);
      console.error(data);
      process.exit(1);
    }

    // Create public directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write stats to public directory
    const statsPath = path.join(publicDir, 'stats.json');
    fs.writeFileSync(statsPath, data);
    console.log(`Stats file successfully written to ${statsPath}`);

    // Log some stats for verification
    try {
      const stats = JSON.parse(data);
      console.log('Total applications:', stats.totalApplications);
      console.log('Average waiting days:', stats.averageWaitingDays);
      console.log('Latest applications count:', stats.latestApplications.length);
    } catch (error) {
      console.error('Error parsing stats JSON:', error);
    }
  });
});

request.on('error', (error) => {
  console.error('Error making request to get-stats function:', error);
  process.exit(1);
});

request.end();
