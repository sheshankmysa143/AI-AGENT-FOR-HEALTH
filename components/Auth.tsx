import React, { useState } from 'react';

const StethoscopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.012 4.162A8.75 8.75 0 0 1 12 2.5a8.75 8.75 0 0 1 5.988 1.662l-2.05 2.05a5.25 5.25 0 0 0-7.876 7.876l-2.05 2.05A8.75 8.75 0 0 1 6.012 4.162ZM17.988 19.838A8.75 8.75 0 0 1 12 21.5a8.75 8.75 0 0 1-5.988-1.662l2.05-2.05a5.25 5.25 0 0 0 7.876-7.876l2.05-2.05a8.75 8.75 0 0 1-5.988 11.976ZM13.06 13.06l5.25-5.25a.75.75 0 0 0-1.06-1.06l-5.25 5.25a.75.75 0 0 0 1.06 1.06ZM8.94 8.94l-5.25 5.25a.75.75 0 0 0 1.06 1.06l5.25-5.25a.75.75 0 0 0-1.06-1.06Z" />
      <path fillRule="evenodd" d="M12 22.5a10.5 10.5 0 1 0 0-21 10.5 10.5 0 0 0 0 21ZM12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" clipRule="evenodd" />
    </svg>
);

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

interface AuthProps {
  onAuthSuccess: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!isLoginView && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate an API call
    setTimeout(() => {
      // In a real app, you'd handle success/error from the server
      console.log(`Simulating ${isLoginView ? 'Login' : 'Sign Up'} for ${email}`);
      setIsLoading(false);
      onAuthSuccess();
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
        <div className="text-center">
            <StethoscopeIcon className="w-16 h-16 mx-auto text-cyan-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
                {isLoginView ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                to access the Health AI Assistant
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <input id="email-address" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                    <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className={`appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800 ${isLoginView ? 'rounded-b-md' : ''} focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm`} placeholder="Password" />
                </div>
                {!isLoginView && (
                    <div>
                        <input id="confirm-password" name="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
                    </div>
                )}
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <div>
                <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-cyan-400 disabled:cursor-not-allowed">
                    {isLoading ? <LoadingSpinner /> : (isLoginView ? 'Sign In' : 'Create Account')}
                </button>
            </div>
        </form>
        <div className="text-sm text-center">
            <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="font-medium text-cyan-600 hover:text-cyan-500">
                {isLoginView ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign In'}
            </button>
        </div>
      </div>
    </div>
  );
};
