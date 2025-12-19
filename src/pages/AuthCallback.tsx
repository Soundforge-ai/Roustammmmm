import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleOAuthCallback } from '@/lib/auth/google';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setStatus('error');
      setError(errorParam);
      return;
    }

    if (!code || !state) {
      setStatus('error');
      setError('Ongeldige callback parameters');
      return;
    }

    handleOAuthCallback(code, state)
      .then((user) => {
        if (user) {
          setStatus('success');
          setTimeout(() => navigate('/jules'), 1500);
        } else {
          setStatus('error');
          setError('Authenticatie mislukt');
        }
      })
      .catch((err) => {
        setStatus('error');
        setError(err.message || 'Onbekende fout');
      });
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center max-w-md">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-brand-accent animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-brand-dark mb-2">Inloggen...</h2>
            <p className="text-gray-500">Even geduld terwijl we je aanmelden.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-brand-dark mb-2">Ingelogd!</h2>
            <p className="text-gray-500">Je wordt doorgestuurd...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-brand-dark mb-2">Fout bij inloggen</h2>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => navigate('/jules')}
              className="px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Terug naar Jules
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
