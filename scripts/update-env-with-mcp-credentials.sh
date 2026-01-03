#!/bin/bash
# Update .env.local met Supabase credentials uit MCP config

# Lees MCP config
MCP_CONFIG="/Users/innovarslabo/.cursor/mcp.json"

if [ ! -f "$MCP_CONFIG" ]; then
  echo "❌ MCP config niet gevonden: $MCP_CONFIG"
  exit 1
fi

# Extract Supabase credentials (simplified - gebruik jq als beschikbaar)
echo "📝 Updating .env.local with Supabase credentials..."

# Supabase URL en keys uit MCP
SUPABASE_URL="https://fwfkrbfozjlxmpfmagrt.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZmtyYmZvempseG1wZm1hZ3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2MTEzMTUsImV4cCI6MjA4MjE4NzMxNX0.Kb-DGWZFsDoPnx15UWhZFrmSnCLiJ68Zow5BlDAKyUU"

# Check of .env.local bestaat
ENV_FILE=".env.local"

if [ ! -f "$ENV_FILE" ]; then
  echo "📄 Creating .env.local..."
  touch "$ENV_FILE"
fi

# Check of Supabase credentials al bestaan
if grep -q "VITE_SUPABASE_URL" "$ENV_FILE"; then
  echo "⚠️  Supabase credentials bestaan al in .env.local"
  echo "   Update handmatig of verwijder oude regels eerst"
else
  echo "" >> "$ENV_FILE"
  echo "# Supabase Configuration (from MCP)" >> "$ENV_FILE"
  echo "VITE_SUPABASE_URL=$SUPABASE_URL" >> "$ENV_FILE"
  echo "VITE_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY" >> "$ENV_FILE"
  echo "✅ Supabase credentials toegevoegd aan .env.local"
fi

echo ""
echo "📋 Project Details:"
echo "   URL: $SUPABASE_URL"
echo "   Dashboard: https://supabase.com/dashboard/project/fwfkrbfozjlxmpfmagrt"
echo ""
echo "✅ Klaar! Herstart de development server."

