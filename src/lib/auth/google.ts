/**
 * Google OAuth 2.0 Authentication
 */

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/auth/callback`;

// Scopes voor Jules API toegang
const SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/cloud-platform',
].join(' ');

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

const AUTH_STORAGE_KEY = 'google_auth_user';

/**
 * Start Google OAuth flow
 */
export function initiateGoogleLogin(): void {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline',
    prompt: 'consent',
    state: generateState(),
  });

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

/**
 * Generate random state for CSRF protection
 */
function generateState(): string {
  const state = crypto.randomUUID();
  sessionStorage.setItem('oauth_state', state);
  return state;
}

/**
 * Handle OAuth callback
 */
export async function handleOAuthCallback(code: string, state: string): Promise<GoogleUser | null> {
  const savedState = sessionStorage.getItem('oauth_state');
  if (state !== savedState) {
    console.error('OAuth state mismatch');
    return null;
  }
  sessionStorage.removeItem('oauth_state');

  try {
    // Exchange code for tokens via backend proxy (to protect client_secret)
    const response = await fetch('/api/auth/google/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirect_uri: REDIRECT_URI }),
    });

    if (!response.ok) {
      throw new Error('Token exchange failed');
    }

    const data = await response.json();
    const user: GoogleUser = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      picture: data.user.picture,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + (data.expires_in * 1000),
    };

    saveUser(user);
    return user;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return null;
  }
}

/**
 * Get current logged in user
 */
export function getCurrentUser(): GoogleUser | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;

    const user: GoogleUser = JSON.parse(stored);
    
    // Check if token expired
    if (user.expiresAt < Date.now()) {
      logout();
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

/**
 * Save user to storage
 */
function saveUser(user: GoogleUser): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

/**
 * Logout user
 */
export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Check if user is logged in
 */
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Get access token for API calls
 */
export function getAccessToken(): string | null {
  const user = getCurrentUser();
  return user?.accessToken || null;
}
