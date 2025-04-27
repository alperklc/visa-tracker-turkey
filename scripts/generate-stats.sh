#!/bin/bash

set -e

# Configuration
SUPABASE_URL="${SUPABASE_URL}"
SUPABASE_ANON_KEY="${SUPABASE_ANON_KEY}"
PROJECT_ID="${PROJECT_ID:-xptezpotlgvxkanvbctd}"

# Check environment variables
if [[ -z "$SUPABASE_URL" ]]; then
  echo "Error: SUPABASE_URL environment variable is required"
  exit 1
fi

if [[ -z "$SUPABASE_ANON_KEY" ]]; then
  echo "Error: SUPABASE_ANON_KEY environment variable is required"
  exit 1
fi

echo "Generating stats file..."

# Define URLs
FUNCTION_URL="${SUPABASE_URL}/functions/v1/get-stats"

# Make request
response=$(curl -s -w "%{http_code}" -H "Content-Type: application/json" -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" "$FUNCTION_URL")
http_code="${response: -3}"
body="${response::-3}"

# Handle HTTP errors
if [[ "$http_code" -ge 400 ]]; then
  echo "Error: Received status code $http_code from function"
  echo "$body"
  exit 1
fi

# Create public directory if it doesn't exist
mkdir -p public

# Write stats to public directory
echo "$body" > public/stats.json
echo "Stats file successfully written to public/stats.json"

# Log some stats for verification
totalApplications=$(echo "$body" | jq '.totalApplications')
averageWaitingDays=$(echo "$body" | jq '.averageWaitingDays')
latestApplicationsCount=$(echo "$body" | jq '.latestApplications | length')

echo "Total applications: $totalApplications"
echo "Average waiting days: $averageWaitingDays"
echo "Latest applications count: $latestApplicationsCount"
